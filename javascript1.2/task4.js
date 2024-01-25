let obj = {
    name: "meet",
    age: 21,
    email: "meetponkiya80@gmail.com",
    phonenumber: 7435863672,
    city: "gondal",
    state: "gujarat",
    pincode: 360311,
  };

//before modify
console.log("brfore modify:")
console.log(obj);

function modifyObject(inputObj){
    
    // Return the object
    return inputObj = {
        name: "meet",
        age: 21
    };
}

let newobj = modifyObject(obj);

//before modify
console.log("after modify:")
console.log(newobj);