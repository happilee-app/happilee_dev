

//Genarating new flow Json
export const updateIds = (jsonObj, startingId) => {
  const idMap = new Map() // Map to store the original id and its corresponding unique id

  function generateUniqueId() {
    return 'q' + Math.random().toString(36).substr(2, 9) // Generates a random unique identifier
  }

  function updateButtonIds(buttons) {
    buttons.forEach((button) => {
      const originalId = button.reply.id
      const uniqueId = idMap.get(originalId) || generateUniqueId() // Use the existing unique id if available or generate a new one

      idMap.set(originalId, uniqueId) // Store the mapping of original id and unique id

      button.reply.id = uniqueId // Update the button's id with the unique id

      if (button.reply.nextId) {
        const originalNextId = button.reply.nextId
        const uniqueNextId = idMap.get(originalNextId) || generateUniqueId() // Use the existing unique id if available or generate a new one

        idMap.set(originalNextId, uniqueNextId) // Store the mapping of original nextId and unique nextId

        button.reply.nextId = uniqueNextId // Update the button's nextId with the unique nextId
      }
    })
  }

  function updateListIds(sections) {
    sections.forEach((section) => {
      section.rows.forEach((row) => {
        const originalId = row.id
        const uniqueId = idMap.get(originalId) || generateUniqueId() // Use the existing unique id if available or generate a new one

        idMap.set(originalId, uniqueId) // Store the mapping of original id and unique id

        row.id = uniqueId // Update the row's id with the unique id

        if (row.nextId) {
          const originalNextId = row.nextId
          const uniqueNextId = idMap.get(originalNextId) || generateUniqueId() // Use the existing unique id if available or generate a new one

          idMap.set(originalNextId, uniqueNextId) // Store the mapping of original nextId and unique nextId

          row.nextId = uniqueNextId // Update the row's nextId with the unique nextId
        }
      })
    })
  }

  function updatePosition(question, highestYAxis) {
    const x = question.position.x + 800 // Modify the x position by adding 200 (adjust as needed)
    const y = question.position.y + highestYAxis + 200 // Modify the y position by adding 200 (adjust as needed)

    question.position.x = x
    question.position.y = y

    highestYAxis = question.position.y
  }

  function removeRootNodeFlag(question) {
    if (question?.isRoot) {
      question.isRoot = false
    }
  }

  const updateQuestionIds = async (questions, startingId) => {
    let startUpdatingForNodeCreation = false
    let startUpdatingForYValueFinding = false
    let highestYAxis = 0

    //finding highest y axis value
    await questions.forEach((question) => {
      if (question.id === startingId) {
        startUpdatingForYValueFinding = true
      } else {
        return sendResponse(res, 400, {
          message: 'Unable find the node',
        })
      }

      if (startUpdatingForYValueFinding) {
        if (question?.position?.y > highestYAxis) {
          highestYAxis = question?.position?.y
        }
      }
    })

    //Node creation starting from here
    await questions.forEach((question) => {
      if (question.id === startingId) {
        startUpdatingForNodeCreation = true
      } else {
        return sendResponse(res, 400, {
          message: 'Unable find the node',
        })
      }

      if (startUpdatingForNodeCreation) {
        const originalId = question.id
        const uniqueId = idMap.get(originalId) || generateUniqueId() // Use the existing unique id if available or generate a new one

        idMap.set(originalId, uniqueId) // Store the mapping of original id and unique id

        question.id = uniqueId // Update the id with the unique id

        if (question.type === 'button' && question.action && question.action.buttons) {
          updateButtonIds(question.action.buttons) // Update the ids of buttons if the question type is "button"
        }

        if (question.type === 'list' && question.action && question.action.sections) {
          updateListIds(question.action.sections) // Update the ids of rows if the question type is "list"
        }

        if (question.nextId) {
          const originalNextId = question.nextId
          const uniqueNextId = idMap.get(originalNextId) || generateUniqueId() // Use the existing unique id if available or generate a new one

          idMap.set(originalNextId, uniqueNextId) // Store the mapping of original nextId and unique nextId

          question.nextId = uniqueNextId // Update the nextId with the unique nextId
        }

        updatePosition(question, highestYAxis) // Update the position of the question
        removeRootNodeFlag(question) //Removing root node flag

        if (question.questions) {
          updateQuestionIds(question.questions) // Recursively update the ids of nested questions
        }
      }
    })
  }

  //functionality startes from here
  updateQuestionIds(jsonObj.questions, startingId) // Update the ids of questions in the tree

  return jsonObj
}
