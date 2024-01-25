let person = {
  name: "meet",
  age: 21,
  city: "gondal",
  state: "gujarat",
  pincode: 360311,
};
let contactdetail = {
  email: "meetponkiya80@gmail.com",
  phonenumber: 7435863672,
};

function combineObj(firstObj, secondObj) {
  let combinedObject = {};
  for (let key in firstObj) {
    combinedObject[key] = firstObj[key];
  }
  for (let key in secondObj) {
    combinedObject[key] = secondObj[key];
  }

  return combinedObject;
}

let newobj = combineObj(person,contactdetail);

//combine object
console.log("combineobj:");
console.log(newobj);
