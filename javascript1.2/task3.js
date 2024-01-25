let people = [
    {
        name: "meet",
        age: 21,
        email: "meetponkiya80@gmail.com",
        phonenumber: 7435863672,
        city: "gondal",
        state: "gujarat",
        pincode: 360311,
      },
      {
        name: "raj",
        age: 21,
        email: "raj80@gmail.com",
        phonenumber:12132332,
        city: "rajkot",
        state: "gujarat",
        pincode: 360330,
      },
      {
        name: "rohan",
        age: 21,
        email: "rohan12@gmail.com",
        phonenumber: 4545454545,
        city: "ahemdabad",
        state: "gujarat",
        pincode: 306303,
      },
      {
        name: "sagar",
        age: 21,
        email: "sagar23@gmail.com",
        phonenumber: 546566566,
        city: "junagadh",
        state: "gujarat",
        pincode: 330300,
      }
];

// loop for display
for (let person of people) {
    console.log("Name:", person.name);
    console.log("Age:", person.age);
    console.log("Email:", person.email);
    console.log("Phone Number:", person.phonenumber);
    console.log("City:", person.city);
    console.log("State:", person.state);
    console.log("Pincode:", person.pincode);
    console.log("------------------");
}