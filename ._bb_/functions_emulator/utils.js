import path from "path";

const getBlock = (url) => {
  const blocks = {
  "_hap_be_copyFlow": {
    "name": "_hap_be_copyFlow",
    "type": "function",
    "directory": "/home/ntpl/Documents/HAPPILEE/HAP/WORKSPACE/_hap_be_copyFlow",
    "middlewares": [],
    "relativeDirectory": "_hap_be_copyFlow"
  }
};

  const block = blocks[url];
  const route = block && path.join(block.directory, "index.js");

  return { route, block };
};

const getMiddlewareBlock = (url) => {
  const blocks = {};

  const block = blocks[url];
  const route = block && path.join(block.directory, "index.js");

  return { route, block };
};

export { getBlock, getMiddlewareBlock };