// tourLib.js

/*
Data model:
{
  "id": 1,
  "name": "Best of Paris in 7 Days Tour",
  "info": "Paris is synonymous with the finest things that culture can offer...",
  "image": "https://www.course-api.com/images/tours/tour-1.jpeg",
  "price": "1,995"
}
*/

let tourArray = [];
let nextId = 1;

function getAll() {
  return tourArray;
}

function addOne(name, info, image, price) {
  if (!name || !info || !image || !price) {
    return false; // basic validation
  }

  const newTour = {
    id: nextId++,
    name,
    info,
    image,
    price
  };

  tourArray.push(newTour);
  return newTour;
}

function findById(id) {
  return tourArray.find(tour => tour.id == id) || false;
}

function updateOneById(id, updatedData) {
  const tour = findById(id);
  if (!tour) return false;

  if (updatedData.name) tour.name = updatedData.name;
  if (updatedData.info) tour.info = updatedData.info;
  if (updatedData.image) tour.image = updatedData.image;
  if (updatedData.price) tour.price = updatedData.price;

  return tour;
}

function deleteOneById(id) {
  const initialLength = tourArray.length;
  tourArray = tourArray.filter(tour => tour.id != id);
  return tourArray.length < initialLength;
}

// Self-test
if (require.main === module) {
  let result = addOne(
    "7 Days Tour",
    "Join us for the Best of Helsinki!",
    "https://www.course-api.com/images/tours/tour-x.jpeg",
    "1,495"
  );
  console.log(result);
  console.log("getAll called:", getAll());
  console.log("findById called:", findById(1));
  console.log("updateOneById called:", updateOneById(1, { price: "1,550" }));
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
