var electronicProducts = [
  { product: "TV", price: 15000 },
  { product: "Mobile", price: 10000 },
  { product: "Laptop", price: 50000 }
];
function addToCart(productIndex) {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var quantity = parseInt(document.getElementById('quantity-' + productIndex).textContent);
  for (var i = 0; i < quantity; i++) {
    cart.push(electronicProducts[productIndex]);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Product added to cart:", electronicProducts[productIndex]);
  location.href = 'orderhistory.html';
}
x
function incrementQuantity(productIndex) {
  var quantitySpan = document.getElementById('quantity-' + productIndex);
  var currentQuantity = parseInt(quantitySpan.textContent);
  quantitySpan.textContent = currentQuantity + 1;
}

function decrementQuantity(productIndex) {
  var quantitySpan = document.getElementById('quantity-' + productIndex);
  var currentQuantity = parseInt(quantitySpan.textContent);
  if (currentQuantity > 0) {
    quantitySpan.textContent = currentQuantity - 1;
  }
}
function displayOrderHistory() {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var tbody = document.getElementById('data-table');

  var totalPrice = 0;
  cart.forEach(function(product) {
      var existingRow = tbody.querySelector('tr[data-product="' + product.product + '"]');
      if (existingRow) {
          var quantityCell = existingRow.querySelector('.quantity-cell');
          var currentQuantity = parseInt(quantityCell.textContent);
          quantityCell.textContent = currentQuantity + 1;
      } else {
          var row = document.createElement('tr');
          row.setAttribute('data-product', product.product);

          var productNameCell = document.createElement('td');
          productNameCell.textContent = product.product;
          row.appendChild(productNameCell);

          var quantityCell = document.createElement('td');
          quantityCell.className = 'quantity-cell';
          quantityCell.textContent = '1';
          row.appendChild(quantityCell);

          var priceCell = document.createElement('td');
          priceCell.textContent = 'Rs.' + product.price + '/-';
          row.appendChild(priceCell);

          tbody.appendChild(row);
      }

      totalPrice += product.price +(product.price*18)/100;
  });

  document.getElementById('total-price').textContent = 'Rs.' + totalPrice + '/-';
}

window.onload = displayOrderHistory;



