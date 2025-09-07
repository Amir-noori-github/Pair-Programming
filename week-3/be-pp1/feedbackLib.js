// feedbackLib.js
/*
Data model:
{
  "id": 1,
  "sender": "John Smith",
  "message": "Great session on React components! I found the examples very helpful.",
  "rating": 5
}
*/

let feedbackArray = [];
let nextId = 1;

function getAll() {
  return feedbackArray;
}

function addOne(sender, message, rating) {
  if (!sender || !message || rating === undefined) {
    return false; // basic validation
  }

  const newFeedback = {
    id: nextId++,
    sender,
    message,
    rating
  };

  feedbackArray.push(newFeedback);
  return newFeedback;
}

function findById(id) {
  return feedbackArray.find(item => item.id == id) || false;
}

function updateOneById(id, updatedData) {
  const feedback = findById(id);
  if (!feedback) return false;

  if (updatedData.sender) feedback.sender = updatedData.sender;
  if (updatedData.message) feedback.message = updatedData.message;
  if (updatedData.rating !== undefined) feedback.rating = updatedData.rating;

  return feedback;
}

function deleteOneById(id) {
  const initialLength = feedbackArray.length;
  feedbackArray = feedbackArray.filter(item => item.id != id);
  return feedbackArray.length < initialLength;
}

// Self-test
if (require.main === module) {
  let result = addOne("John Smith", "Great session on React components! I found the examples very helpful.", 4);
  console.log(result);
  console.log("getAll called:", getAll());
  console.log("findById called:", findById(1));
  console.log("updateOneById called:", updateOneById(1, { rating: 5 }));
  console.log("deleteOneById called:", deleteOneById(1));
  console.log("getAll after delete:", getAll());
}

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById
};
