function calculateBMI() {
  var height = document.getElementById("height").value;
  var weight = document.getElementById("weight").value;
  const h2 = document.getElementById('category');
  const h1 = document.getElementById('result');
  var BMI = weight / (height * height);
  var category = "";

  if (BMI < 18.5) {
    category = "You Are Underweight.";
    h2.style.color = 'red';
  } 
  else if (BMI >= 18.5 && BMI < 24.9) {
    category = "Your weight is normal !!";
    h2.style.color = 'green';
  } 
  else if (BMI > 25 && BMI < 29.9) {
    category = "You Are Overweight";
    h2.style.color = 'orange';
  } 
  else if(BMI > 29.9){
    category = "You are Obese";
    h2.style.color = 'red';
  }

  h1.innerHTML = BMI;
  h2.innerHTML = category;
}
function submitForm(event) {
  event.preventDefault();
}
