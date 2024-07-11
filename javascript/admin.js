// section products
function getDataLocalstorage(nameData) {
  return JSON.parse(localStorage.getItem(nameData));
}
let tagTableProduct = document.getElementById("table-product");

let totalProducts = Object.values(getDataLocalstorage("products"));

const itemPerPage = 5;
let totalPage = Math.ceil(totalProducts.length / itemPerPage);
let currentPage = 0;

if (getDataLocalstorage("currentPage")) {
  currentPage = getDataLocalstorage("currentPage");
} else {
  currentPage = 1;
}
let skipProduct = (currentPage - 1) * itemPerPage;
let currentProducts = totalProducts.slice(
  skipProduct,
  skipProduct + itemPerPage
);
console.log("trước khi get proudct", currentProducts);
function displayProduct(currentProducts) {
  let contentHtmlTable = ` <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Color</th>
            <th>Category</th>
            <th></th>
          </tr>`;
  for (let product of currentProducts) {
    contentHtmlTable += `
            <tr>
            <td>${product.id}</td>
            <td><img src="../image/products/${product.image1}" alt="${
      product.name
    }" /></td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}</td>
            <td>${product.category}</td>
            <td>${product.color}</td>
            <td>${product.inventory}</td>
            <td>
              
              <button>Update</button>
              <button>Delete</button>
            </td>
          </tr>
        `;
  }
  return contentHtmlTable;
}

tagTableProduct.innerHTML += displayProduct(currentProducts);
console.log("kêt quả cuối ", tagTableProduct);
