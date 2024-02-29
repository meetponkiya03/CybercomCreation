function validateProductTitle() {
  var productTitleInput = document.getElementById("productTitle");
  var productTitleError = document.getElementById("titleError");
  var productTitle = productTitleInput.value.trim();

  if (productTitle === "") {
    productTitleError.textContent = "Please enter product title";
    return false;
  } else {
    productTitleError.textContent = "";
    return true;
  }
}

function validateProductPrice() {
  var productPriceInput = document.getElementById("productPrice");
  var productPriceError = document.getElementById("priceError");
  var productPrice = productPriceInput.value.trim();

  if (productPrice === "") {
    productPriceError.textContent = "Please enter a valid price";
    return false;
  } else {
    productPriceError.textContent = "";
    return true;
  }
}

function validateProductDescription() {
  var productDescriptionInput = document.getElementById("productDescription");
  var productDescriptionError = document.getElementById("descriptionError");
  var productDescription = productDescriptionInput.value.trim();

  if (productDescription === "") {
    productDescriptionError.textContent = "Please enter product description";
    return false;
  } else {
    productDescriptionError.textContent = "";
    return true;
  }
}

function validateProductCategoryId() {
  var productCategoryIdInput = document.getElementById("productCategoryId");
  var productCategoryIdError = document.getElementById("categoryIdError");
  var productCategoryId = productCategoryIdInput.value;

  if (!productCategoryId) {
    productCategoryIdError.textContent = "Please select a category";
    return false;
  } else {
    productCategoryIdError.textContent = "";
    return true;
  }
}

function validateProductImage() {
  var productImageInput = document.getElementById("productImage");
  var productImageError = document.getElementById("imageError");
  var productImage = productImageInput.value.trim();

  if (productImage === "") {
    productImageError.textContent = "Please enter product image URL";
    return false;
  } else {
    productImageError.textContent = "";
    return true;
  }
}

function validateForm() {
  var isProductTitleValid = validateProductTitle();
  var isProductPriceValid = validateProductPrice();
  var isProductDescriptionValid = validateProductDescription();
  var isProductCategoryIdValid = validateProductCategoryId();
  var isProductImageValid = validateProductImage();

  return isProductTitleValid && isProductPriceValid && isProductDescriptionValid && isProductCategoryIdValid && isProductImageValid;
}

const fetchCategories = async () => {
  try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      if (!response.ok) {
          throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      const selectElement = document.getElementById("productCategoryId");
      data.forEach(category => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          selectElement.appendChild(option);
      });
  } catch (error) {
      console.error("Error fetching categories:", error);
  }
};

document.addEventListener("DOMContentLoaded", fetchCategories);

const clear = () =>{
  alert('Data added successfully ');
  document.getElementById("productTitle").value="";
  document.getElementById("productPrice").value="";
  document.getElementById("productDescription").value="";
  document.getElementById("productCategoryId").value="";
  document.getElementById("productImage").value="";
}
function addDataToAPI() {
  var productTitle = document.getElementById("productTitle").value;
  var productPrice = document.getElementById("productPrice").value;
  var productDescription = document.getElementById("productDescription").value;
  var productCategoryId = document.getElementById("productCategoryId").value;
  var productImage = document.getElementById("productImage").value;
  
  fetch(" https://api.escuelajs.co/api/v1/products/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: productTitle,
      price: parseInt(productPrice),
      description: productDescription,
      categoryId: parseInt(productCategoryId),
      images: [productImage]
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to add data. Please try again.');
    }
  })
  .then( 
    clear(),
     
  )
  .catch(error => {
    alert('Error adding data: ' + error.message);
  });
}


function submitForm() {
  if (validateForm()) {
    addDataToAPI();
  } else {
    alert('Form data is invalid. Please check and try again.');
  }
}
document.getElementById("submitBtn").addEventListener("click", function(event) {
  event.preventDefault(); 
  submitForm(); 
});
