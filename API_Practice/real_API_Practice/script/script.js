const pageSize = 10;
let currentPage = 1;
let productsData = [];

const getDataFromAPI = () => {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      productsData = data;
      renderProducts(currentPage);
      renderPagination();
    });
};
document.addEventListener("DOMContentLoaded", () => {
  getDataFromAPI();
});

const renderProducts = (page) => {
  let output = "";
  const startIndex = (page - 1) * pageSize; 
  const endIndex = startIndex + pageSize;
  const pageProducts = productsData.slice(startIndex, endIndex);
  pageProducts.forEach((product) => {
    output += `<div class="product">
      <img src="..." alt="Product">
      <h3>Name: ${product.title}</h3>
      <h3>Category: ${product.category.name}</h3>
      <p>${product.description}</p>
      <p class="price">Price: RS.${product.price}/-</p>
      <div class="buttons">
          <button class="edit-button" onclick="updateDataInAPI(${product.id})">Edit</button>
          <button class="delete-button" onclick="deleteProduct(${product.id})">Delete</button>
      </div>
    </div>`;
  });
  const allProducts = document.querySelector(".allProducts");
  allProducts.innerHTML = output;
};

const renderPagination = () => {
  const paginationContainer = document.querySelector(".pagination");
  const totalPages = Math.ceil(productsData.length / pageSize);
  let paginationHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<li class="page-item">
      <button class="page-link" onclick="changePage(${i})">${i}</button>
    </li>`;
  }
  paginationContainer.innerHTML = paginationHTML;
};

const changePage = (page) => {
  currentPage = page;
  getDataFromAPI();
};

const deleteProduct = (productId) => {
  try {
    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmation) {
      const url = `https://api.escuelajs.co/api/v1/products/${productId}`;

      fetch(url, {
        method: "DELETE",
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
          alert(
            "An error occurred while deleting the product. Please try again later."
          );
        });
    }
  } catch (error) {
    console.error("Confirmation error:", error);
    alert("An error occurred while confirming deletion. Please try again.");
  }
};
const updateDataInAPI = (productId) => {
  window.location.href = `Update.html?id=${productId}`;
};

const searchProducts = () => {
  const searchInput = document.getElementById("search");
  const searchText = searchInput.value.trim().toLowerCase();
  
  if (searchText === "") {
    getDataFromAPI(); 
    return;
  }
  
  productsData = productsData.filter(product =>
    product.title.toLowerCase().includes(searchText)
  );

  if (productsData.length === 0) {
    displayNoDataMessage();
    return;
  }

  currentPage = 1;
  renderProducts(currentPage);
  renderPagination();
};

const displayNoDataMessage = () => {
  const noDataMessageElement = document.getElementById("noDataMessage");
  noDataMessageElement.textContent = "No data found.";
};

document.addEventListener("change", (event) => {
  if (event.target && event.target.id === "sortingDropdown") {
    sortFunction();
  }
});

const sortFunction = () => {
  const sortingDropdown = document.getElementById("sortingDropdown");
  const selectedOption = sortingDropdown.value;

  let sortedProducts;

  if (selectedOption === "low") {
    sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
  } else if (selectedOption === "high") {
    sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
  } else {
    return;
  }

  productsData = sortedProducts;
  //console.log(productsData);
  
  currentPage = 1;
  renderProducts(currentPage);
  renderPagination();
};
