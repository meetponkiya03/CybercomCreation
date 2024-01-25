let person = {
  name: "meet",
  age: 21,
  email: "meetponkiya80@gmail.com",
  phonenumber: 7435863672,
  city: "gondal",
  state: "gujarat",
  pincode: 360311,
};


//access the property using []
console.log("access before modify using []");
console.log(person["name"]);
console.log(person["age"]);
console.log(person["email"]);
console.log(person["phonenumber"]);
console.log(person["city"]);
console.log(person["state"]);
console.log(person["pincode"]);

//access the property using .
console.log("access before modify using.");
console.log(person.name);
console.log(person.age);
console.log(person.email);
console.log(person.phonenumber);
console.log(person.city);
console.log(person.state);
console.log(person.pincode);

//modify the property
person["name"] = "Raj";
person["age"] = "21";
person["email"] = "raj90@gmail.com";
person["phonenumber"] = "7435833672";
person["city"] = "rajkot";

//access after modify
console.log("access after modify");
console.log(person.name);
console.log(person.age);
console.log(person.email);
console.log(person.phonenumber);
