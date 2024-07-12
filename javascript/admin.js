// section products
function getDataLocalstorage(nameData) {
  return JSON.parse(localStorage.getItem(nameData));
}
let tagTableProduct = document.getElementById("table-product");

let totalProducts = Object.values(getDataLocalstorage("products"));
let tagPagination = document.querySelector(".pagination");
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

function getProduct(currentProducts) {
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
            <td>${product.inventory}</td>
            <td>${product.color}</td>
            <td>${product.category}</td>
            <td>
              
              <button>Update</button>
              <button>Delete</button>
            </td>
          </tr>
        `;
  }
  return contentHtmlTable;
}

function getCurrentPagination(currentPage) {
  let rs = `<button id="lt-pagination">&lt;</button>`;
  let curentPagination = Math.ceil(currentPage / 10) * 10;
  for (let i = curentPagination - 9; i <= curentPagination; i++) {
    rs += `<button class="sub-pagination" title="${i}">${i}</button>`;
  }
  rs += `<button id="gt-pagination">&gt;</button>`;
  return rs;
}

function updateDataLocalStorage(nameData, newData) {
  localStorage.setItem(nameData, JSON.stringify(newData));
}

function updateProduct(
  tagTableProduct,
  tagPagination,
  currentPage,
  currentProducts
) {
  tagTableProduct.innerHTML += getProduct(currentProducts);
  tagPagination.innerHTML += getCurrentPagination(currentPage);
}
updateProduct(tagTableProduct, tagPagination, currentPage, currentProducts);

let subPagination = document.querySelectorAll(".sub-pagination");
let ltPagination = document.getElementById("lt-pagination");
let gtPagination = document.getElementById("gt-pagination");
for (let pagination of subPagination) {
  let currentPage = pagination.getAttribute("title");
  pagination.addEventListener("click", function (e) {
    updateDataLocalStorage("currentPage", currentPage);
    window.location.reload();
  });
}

ltPagination.addEventListener("click", function (e) {
  if (currentPage > 10) {
    updateDataLocalStorage("currentPage", currentPage - 10);
    window.location.reload();
  }
});

gtPagination.addEventListener("click", function (e) {
  if (currentPage + 10 <= totalPage) {
    updateDataLocalStorage("currentPage", currentPage + 10);
    window.location.reload();
  } else {
    updateDataLocalStorage("currentPage", totalPages);
  }
});

// section
