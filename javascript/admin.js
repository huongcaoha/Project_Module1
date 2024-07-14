// Controls dashbroad
const controlContent1 = document.getElementById("content1");
controlContent1.addEventListener("click", function () {
  updateDataLocalStorage("currentDisplayContent", 1);
  window.location.reload();
});
console.log(controlContent1);
const controlProduct = document.getElementById("section-product");
controlProduct.addEventListener("click", function () {
  updateDataLocalStorage("currentDisplayContent", 2);
  window.location.reload();
});

const controlRevenue = document.getElementById("section-revenue");
controlRevenue.addEventListener("click", function () {
  updateDataLocalStorage("currentDisplayContent", 3);
  window.location.reload();
});

const controlUser = document.getElementById("section-user");
controlUser.addEventListener("click", function () {
  updateDataLocalStorage("currentDisplayContent", 4);
  window.location.reload();
});

const controlOrder = document.getElementById("section-order");
controlOrder.addEventListener("click", function () {
  updateDataLocalStorage("currentDisplayContent", 5);
  window.location.reload();
});

let content1 = document.querySelector(".content1");
let sectionProduct = document.querySelector(".section-product");
let sectionRevenue = document.querySelector(".section-revenue");
let sectionUser = document.querySelector(".section-user");
let sectionOrder = document.querySelector(".section-order");
console.log(content1);
let listControls = [
  "123",
  content1,
  sectionProduct,
  sectionRevenue,
  sectionUser,
  sectionOrder,
];
let currentDisplayContent = getDataLocalstorage("currentDisplayContent");
for (let i = 0; i < listControls.length; i++) {
  if (i != currentDisplayContent) {
    listControls[i].classList.add("display-none");
  }
}

// section products
function getDataLocalstorage(nameData) {
  return JSON.parse(localStorage.getItem(nameData));
}

function updateDataLocalStorage(nameData, newData) {
  localStorage.setItem(nameData, JSON.stringify(newData));
}

let tagTableProduct = document.getElementById("table-product");

let totalProducts = [];
let productsData = getDataLocalstorage("products");
if (productsData == null) {
} else {
  totalProducts = Object.values(getDataLocalstorage("products"));
}
let productTagPagination = document.querySelector(".pagination");
const itemPerPage = 5;
let totalPage = Math.ceil(totalProducts.length / itemPerPage);
let adminProductCurrentPage = 1;

if (getDataLocalstorage("adminProductCurrentPage")) {
  adminProductCurrentPage = getDataLocalstorage("adminProductCurrentPage");
}
let skipProduct = (adminProductCurrentPage - 1) * itemPerPage;
let currentProducts = totalProducts.slice(
  skipProduct,
  skipProduct + itemPerPage
);

// Điều khiển các khối trong trang admin
let blockContent1 = document.querySelector(".content1");
let blockSectionProduct = document.querySelector(".section-product");
let blockSectionRevenue = document.querySelector(".section-revenue");
let blockSectionUser = document.querySelector(".section-user");
let blockSectionOrder = document.querySelector(".section-order");
let listBlockSections = [
  blockContent1,
  blockSectionProduct,
  blockSectionRevenue,
  blockSectionUser,
  blockSectionOrder,
];

let controlBlockContent1 = document.querySelector("#content1");
let controlBlockSectionProduct = document.querySelector("#section-product");
let controlBlockSectionRevenue = document.querySelector("#section-revenue");
let controlBlockSectionUser = document.querySelector("#section-user");
let controlBlockSectionOrder = document.querySelector("#section-order");
let listControlBlocks = [
  controlBlockContent1,
  controlBlockSectionProduct,
  controlBlockSectionRevenue,
  controlBlockSectionUser,
  controlBlockSectionOrder,
];

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
              
              <button class="productButtonUpdate" title="${
                product.id
              }">Update</button>
              <button class="productButtonDelete" title="${
                product.id
              }">Delete</button>
            </td>
          </tr>
        `;
  }
  return contentHtmlTable;
}
let curentPagination = Math.ceil(adminProductCurrentPage / 10) * 10;
function getCurrentPagination(adminProductCurrentPage) {
  let rs = `<button id="lt-pagination">&lt;</button>`;

  for (let i = curentPagination - 9; i <= curentPagination; i++) {
    if (adminProductCurrentPage == i) {
      rs += `<button class="sub-pagination" title="${i}" style="background-color: #2bcfe7;">${i}</button>`;
    } else {
      rs += `<button class="sub-pagination" title="${i}">${i}</button>`;
    }
    if (i == totalPage) {
      break;
    }
  }
  rs += `<button id="gt-pagination">&gt;</button>`;
  return rs;
}

function updateProducts(
  tagTableProduct,
  tagPagination,
  adminProductCurrentPage,
  currentProducts
) {
  tagTableProduct.innerHTML += getProduct(currentProducts);
  tagPagination.innerHTML += getCurrentPagination(adminProductCurrentPage);
}
updateProducts(
  tagTableProduct,
  productTagPagination,
  adminProductCurrentPage,
  currentProducts
);

let subPagination = document.querySelectorAll(".sub-pagination");
let ltPagination = document.getElementById("lt-pagination");
let gtPagination = document.getElementById("gt-pagination");
for (let pagination of subPagination) {
  let adminProductCurrentPage = pagination.getAttribute("title");
  pagination.addEventListener("click", function (e) {
    updateDataLocalStorage("adminProductCurrentPage", adminProductCurrentPage);
    window.location.reload();
  });
}

ltPagination.addEventListener("click", function (e) {
  if (adminProductCurrentPage > 10) {
    updateDataLocalStorage(
      "adminProductCurrentPage",
      adminProductCurrentPage - 10
    );
    window.location.reload();
  }
});

gtPagination.addEventListener("click", function (e) {
  if (adminProductCurrentPage + 10 <= totalPage) {
    updateDataLocalStorage(
      "adminProductCurrentPage",
      adminProductCurrentPage + 10
    );
    window.location.reload();
  } else {
    updateDataLocalStorage("adminProductCurrentPage", totalPage);
    window.location.reload();
  }
});

// create new product
let productFormCreate = document.getElementById("productFormCreate");
let productButtonCreate = document.getElementById("productButtonCreate");
let productButtonCancel = document.querySelector(".productButtonCancel");
let buttonDisplayFormCreate = document.querySelector(
  "#buttonDisplayFormCreate"
);

buttonDisplayFormCreate.addEventListener("click", function () {
  productFormCreate.style.display = "block";
});

if (productButtonCreate) {
  productButtonCreate.addEventListener("click", function () {
    createNewProduct();
    alert("Create new product successfully !");
    productFormCreate.style.display = "none";
    window.location.reload();
  });
}

if (productButtonCancel) {
  productButtonCancel.addEventListener("click", function () {
    productFormCreate.style.display = "none";
  });
}

function createNewProduct() {
  let productInputName = document.getElementById("productInputName");
  let productInputPrice = document.getElementById("productInputPrice");
  let productInputColor = document.getElementById("productInputColor");
  let productInputCategory = document.getElementById("productInputCategory");
  let productInputInventory = document.getElementById("productInputInventory");
  let productInputImage1 = document.getElementById("productInputImage1");
  let productInputImage2 = document.getElementById("productInputImage2");

  //còn thiếu đoạn code lưu ảnh
  let imageName1 = productInputImage1?.files?.[0]?.name ?? "";

  let imageName2 = productInputImage2?.files?.[0]?.name ?? "";

  let totalProducts = [];
  const productsData = getDataLocalstorage("products");
  if (productsData != null) {
    totalProducts = Object.values(getDataLocalstorage("products"));
  }
  let productName = productInputName.value;
  let price = productInputPrice.value;
  let color = productInputColor.value;
  let category = productInputCategory.value;
  let inventory = productInputInventory.value;
  let image1 = imageName1;
  let image2 = imageName2;
  let id = 1;
  if (totalProducts.length > 1 && totalProducts != null) {
    id = totalProducts[totalProducts.length - 1].id + 1;
  }

  let newProduct = {
    id: id,
    category: category,
    name: productName,
    price: price,
    image1: image1,
    image2: image2,
    color: color,
    inventory: inventory,
  };

  totalProducts.push(newProduct);
  updateDataLocalStorage("products", totalProducts);
}

// update product

let productFormUpdate = document.getElementById("productFormUpdate");
let productButtonUpdate = document.getElementById("productButtonUpdate");
let listButtonUpdate = document.querySelectorAll(".productButtonUpdate");

// kiểm tra button cancel2 có tồn tại ko?
let productButtonCancel2 = document.querySelector(".productButtonCancel2");

for (let btnUpdate of listButtonUpdate) {
  btnUpdate.addEventListener("click", function () {
    productFormUpdate.style.display = "block";
    let id = btnUpdate.getAttribute("title");
    let product =
      currentProducts[currentProducts.findIndex((element) => element.id == id)];
    productFormUpdate.innerHTML = ` <div class="form">
        <div>
          <h2>Update Product</h2>
        </div>

        <div>
          <label for="productInputName2">Product Name :</label>
          <input type="text" id="productInputName2" class="productInputName2" value="${
            product.name
          }"/>
        </div>

        <div>
          <label for="productInputPrice2">Price : </label>
          <input
            type="number"
            id="productInputPrice2"
            name="productInputPrice2"
            value="${product.price}"
          />
        </div>

        <div>
          <label for="productInputColor2">Color :</label>
          <select name="productInputColor2" id="productInputColor2">
            <option value="">Select</option>
            <option value="black" ${
              product.color === "black" ? "selected" : ""
            }>Black</option>
            <option value="purple" ${
              product.color === "purple" ? "selected" : ""
            }>Purple</option>
            <option value="gray" ${
              product.color === "gray" ? "selected" : ""
            }>Gray</option>
            <option value="white" ${
              product.color === "white" ? "selected" : ""
            }>White</option>
            <option value="blue" ${
              product.color === "blue" ? "selected" : ""
            }>Blue</option>
            <option value="brown" ${
              product.color === "brown" ? "selected" : ""
            }>Brown</option>
            <option value="pink" ${
              product.color === "pink" ? "selected" : ""
            }>Pink</option>
            <option value="grey" ${
              product.color === "grey" ? "selected" : ""
            }>Grey</option>
          </select>
        </div>

        <div>
          <label for="productInputCategory2">Category :</label>
          <select name="productInputCategory2" id="productInputCategory2">
            <option value="">Select</option>
            <option value="vest" ${
              product.category === "vest" ? "selected" : ""
            }>Vest</option>
            <option value="threeHoles" ${
              product.category === "threeHoles" ? "selected" : ""
            }>ThreeHoles</option>
            <option value="longSleeveShirt" ${
              product.category === "longSleeveShirt" ? "selected" : ""
            }>LongSleeveShirt</option>
            <option value="patternedShirt" ${
              product.category === "patternedShirt" ? "selected" : ""
            }>PatternedShirt</option>
            <option value="polo" ${
              product.category === "polo" ? "selected" : ""
            }>Polo</option>
            <option value="longPolo" ${
              product.category === "longPolo" ? "selected" : ""
            }>Long Polo</option>
            <option value="koreanMen" ${
              product.category === "koreanMen" ? "selected" : ""
            }>Korean Men</option>
            <option value="jacket" ${
              product.category === "jacket" ? "selected" : ""
            }>Jacket</option>
            <option value="feltset" ${
              product.category === "feltset" ? "selected" : ""
            }>Feltset</option>
          </select>
        </div>

        <div>
          <label for="productInputInventory2">Inventory :</label>
          <input
            type="number"
            name="productInputInventory2"
            id="productInputInventory2"
            value="${product.inventory}"
          />
        </div>

        <div>
          <label for="productInputImage12">Image 1 :</label>
          <input
            type="file"
            name="productInputImage12"
            id="productInputImage12"
            accept="image/*"
            value="${product.image1}"
          />
        </div>

        <div>
          <label for="productInputImage22">Image 2 :</label>
          <input
            type="file"
            name="productInputImage22"
            id="productInputImage22"
            accept="image/*"
            value="${product.image2}"
          />
        </div>

        <div class="div-button">
          <button id="productButtonUpdate" title="${product.id}">Update</button>
          <button class="productButtonCancel2">Cancel</button>
        </div>
      </div>`;
    productButtonUpdate = document.getElementById("productButtonUpdate");
    productButtonCancel2 = document.querySelector(".productButtonCancel2");
    productButtonCancel2.addEventListener("click", function () {
      productFormUpdate.style.display = "none";
    });

    function updateProduct() {
      let productInputName2 = document.getElementById("productInputName2");
      let productInputPrice2 = document.getElementById("productInputPrice2");
      let productInputColor2 = document.getElementById("productInputColor2");
      let productInputCategory2 = document.getElementById(
        "productInputCategory2"
      );
      let productInputInventory2 = document.getElementById(
        "productInputInventory2"
      );
      let productInputImage12 = document.getElementById("productInputImage12");
      let productInputImage22 = document.getElementById("productInputImage22");

      //còn thiếu đoạn code lưu ảnh
      let imageName1 =
        productInputImage12 &&
        productInputImage12.files &&
        productInputImage12.files[0]
          ? productInputImage12.files[0].name
          : `${product.image1}`;
      let imageName2 =
        productInputImage22 &&
        productInputImage22.files &&
        productInputImage22.files[0]
          ? productInputImage22.files[0].name
          : `${product.image2}`;

      let totalProducts = getDataLocalstorage("products");
      let productName = productInputName2.value;
      let price = productInputPrice2.value;
      let color = productInputColor2.value;
      let category = productInputCategory2.value;
      let inventory = productInputInventory2.value;
      let image1 = imageName1;
      let image2 = imageName2;
      let id = btnUpdate.getAttribute("title");
      let index = totalProducts.findIndex((element) => element.id == id);

      let newProduct = {
        id: id,
        category: category,
        name: productName,
        price: price,
        image1: image1,
        image2: image2,
        color: color,
        inventory: inventory,
      };

      totalProducts[index] = newProduct;
      updateDataLocalStorage("products", totalProducts);
    }
    if (productButtonUpdate) {
      productButtonUpdate.addEventListener("click", function () {
        updateProduct();
        alert("Update product successfully !");
        productFormUpdate.style.display = "none";
        window.location.reload();
      });
    }
  });
}

// delete product

let productButtonDeletes = document.querySelectorAll(".productButtonDelete");
for (let btnDelete of productButtonDeletes) {
  btnDelete.addEventListener("click", function () {
    let id = btnDelete.getAttribute("title");
    let indexProduct = totalProducts.findIndex((element) => element.id == id);
    totalProducts.splice(indexProduct, 1);
    updateDataLocalStorage("products", totalProducts);
    window.location.reload();
  });
}
