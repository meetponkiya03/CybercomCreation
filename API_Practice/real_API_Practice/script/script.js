const getDataFromAPI = () => {
  fetch( "https://api.escuelajs.co/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
      renderProducts(data);
    });
};
getDataFromAPI();

const renderProducts = (data) => {
  let output = "";
  data.forEach((products) => {
    output += `<div class="product">
      <img src="....." alt="Product">
      <h3>Name:${products.title}</h3>
      <h3>Category:${products.category.name}</h3>
      <p>${products.description}</p>
      <p class="price">Price:RS.${products.price}/-</p>
      <div class="buttons">
          <button class="edit-button" onclick="updateDataInAPI(${products.id})">Edit</button>
          <button class="delete-button" onclick="deleteProduct(${products.id})">Delete</button>
      </div>
  </div>`;
  });
  const allProducts = document.querySelector(".allProducts");
  allProducts.innerHTML = output;
};

const deleteProduct = (productId) => {
  try {
    const confirmation = confirm("Are you sure you want to delete this product?");
    
    if (confirmation) {
      const url = `https://api.escuelajs.co/api/v1/products/${productId}`;

      fetch(url, {
        method: "DELETE"
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        return response.json();
      })
      .then(() => {
        alert("Product deleted successfully!");
        getDataFromAPI();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product. Please try again later.");
      });
    }
  } catch (error) {
    console.error("Confirmation error:", error);
    alert("An error occurred while confirming deletion. Please try again.");
  }
};
const updateDataInAPI = (productId) =>{
  window.location.href = `Edit.html?id=${productId}`;
}
