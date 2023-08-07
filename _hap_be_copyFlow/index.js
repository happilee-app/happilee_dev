import "./dotenv.js";
import path from "path";
import db from "./Shared/database/models/index.js";
// Change the sdk import to npm (currently for testing local path is given)
import blox from "../../../node-blox-sdk-main/index.js";

const functionName = path.resolve().split("/").pop();
import importedPort from "./Shared/ports.js";
const port = importedPort[functionName];
import joi from "joi";
import { authenticateClient } from "./Shared/auth_utils.js";
import { sendResponse, getBody, updateIds } from "./genarateCopyFlow.js";

/**
 * @method validator
 * @param {object} data
 * @returns {{ error:boolean, data:string } | object } error: boolean and data: error message |
 * returns body object
 * @description validates an object using joi
 */
const validator = async (data) => {
  const schema = joi.object({
    flow_id: joi.string().required(),
    startNodeId: joi.string().required(),
  });

  const result = schema.validate(data);

  if (result.error) {
    const error = result.error.details[0].message;
    data = {
      error: true,
      data: error,
    };
    return data;
  } else {
    data = { ...result.value };
  }

  return data;
};

/**
 * @method _hap_be_copyFlow
 * @param {object} request
 * @param {object} response
 * @description authenticate client, validate request body, update project status to inactive
 */

const _hap_be_copyFlow = async (req, res) => {

  const requestBody = await getBody(req);

  const validationData = await validator(requestBody);
  if (!validationData || validationData?.error === true) {
    return sendResponse(res, 500, {
      status: "Invalid request body",
      message: validationData.data,
    });
  }

  try {
    //decoding token information
    const decodedData = await authenticateClient(req);
    if (decodedData.error) {
      return sendResponse(
        res,
        decodedData.status,
        decodedData.data || "failed"
      );
    }

    const validationData = await validator(requestBody);
    if (!validationData || validationData?.error === true) {
      return sendResponse(res, 500, {
        status: "Invalid request body",
        message: validationData.data,
      });
    }

    let startNodeId = requestBody?.startNodeId;
    let flowId = requestBody?.flow_id;

    try {
      await db.sequelize.transaction(async (t) => {
        //we need to find the flow details
        const flow = await db.flow_trees.find(
          {
            where: {
              project_main_question_id: flowId,
            },
          },
          { transaction: t }
        );

        //replicated flow genaration part
        const newReplicatedFlowJson = await updateIds(
          flow?.drafted_flow,
          startNodeId
        );

        //final draft flow building
        let finaldraftFlow = [
          {
            id: data[0].id,
            questions: [
              ...data[0].questions,
              ...newReplicatedFlowJson[0].questions,
            ],
          },
        ];

        //db updation
        await db.flow_trees.update(
          {
            drafted_flow: finaldraftFlow,
          },
          {
            where: {
              project_main_question_id: flowId,
            },
          },
          { transaction: t }
        );
      });

    } catch (e) {
      return sendResponse(res, 400, {
        message: "Unable to copy flow",
      });
    }
  } catch (e) {
    return sendResponse(res, 500, { status: "failed" });
  }
};

export default _hap_be_copyFlow;
/**
 * Run the function using node-blox-sdk
 */
if (
  process.env.NODE_ENV === "development" &&
  process.env.APP_ENV === "stichEnv"
) {
  // eslint-disable-next-line no-console
  console.log("STICH ENV");
} else if (process.env.NODE_ENV === "development") {
  blox.functions.run(_hap_be_copyFlow, port);
} else {
  blox.functions.run(_hap_be_copyFlow);
}

