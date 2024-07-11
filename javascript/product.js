// function
function getDataLocalStorage(nameData) {
  let data;
  if (localStorage.getItem(nameData)) {
    data = localStorage.getItem(nameData);
  } else {
    return "";
  }
  return JSON.parse(data);
}

function updateDataLocalStorage(nameData, newData) {
  localStorage.setItem(nameData, JSON.stringify(newData));
}

// khai báo biến
let slide = document.querySelector(".slide");
const slideVest = "../image/slide/sildeVest.webp";
const slideThreeHoles = "../image/slide/sildeThreeHoles.jpg";
const slideslideLongSleeveShirt = "../image/slide/slideLongSleeveShirt.webp";
const slidePolo = "../image/slide/slidePolo.webp";
const slideLongPolo = "../image/slide/slideLongPolo.jpg";
const slideKoreanMen = "../image/slide/slideKoreanMen.jpg";
const slideJacket = "../image/slide/slideJacket.jpg";
const slideFeltset = "../image/slide/slideFeltset.jpg";
const slidePatternedShirt = "../image/slide/slidePatternedShirt.jpg";
let listTagCategorySlide = document.querySelectorAll(".categorySlide");

let getSlide = getDataLocalStorage("slide");
let getCategory = getDataLocalStorage("categoryProduct");
let getSearch = getDataLocalStorage("search");
let listCategory = getDataLocalStorage("category");

const arraySlide = [
  slidePatternedShirt,
  slideVest,
  slideThreeHoles,
  slideslideLongSleeveShirt,
  slidePatternedShirt,
  slidePolo,
  slideLongPolo,
  slideKoreanMen,
  slideJacket,
  slideFeltset,
];

let totalProductJson = localStorage.getItem("products");
let totalProducts = JSON.parse(totalProductJson);
let totalCategoryJson = localStorage.getItem("category");
let totalCategory = JSON.parse(totalCategoryJson);
let tagResultProduct = document.querySelector(".resultProduct");
let tagFilterCategories = document.getElementById("categories");
let tagFilterColor = document.querySelectorAll(
  ".filter-color input[type='radio']"
);

let tagFilterPrice = document.querySelectorAll(
  ".filter-price input[type='radio']"
);

let listProduct = [];
let category = "";
let color = "";
let price = 0;
let tagProducts = document.querySelectorAll(".product");

listTagCategorySlide.forEach((tag) =>
  tag.addEventListener("click", function (e) {
    categoryProduct = e.target.getAttribute("title");
    slide = e.target.getAttribute("title");
    console.log(slide);
    updateDataLocalStorage("categoryProduct", categoryProduct);
    updateDataLocalStorage("slide", slide);
  })
);

// get slide image
if (getSlide != null && getSlide >= 0 && getSlide <= 9) {
  slide.src = arraySlide[getSlide];
} else {
  slide.src = arraySlide[0];
}

// get information filter

tagFilterCategories.addEventListener("change", function () {
  category = listCategory[this.value];
  updateProduct();
  console.log(category);
});

// if (getCategory != null) {
//   category = getCategory;
//   updateProduct();
// } else {
//   category = "all";
//   updateProduct();
// }

if (category == "all" || category == null) {
  listProduct = totalProducts;
} else {
  listProduct = totalProducts.filter(
    (product) => product.category == listCategory[getCategory]
  );
}

if (category != null) {
  listProduct = totalProducts.filter(
    (product) => product.category == listCategory[getCategory]
  );
  updateProduct();
} else {
  listProduct = totalProducts;
  updateProduct();
}

tagFilterColor.forEach((radio) => {
  radio.addEventListener("change", function (e) {
    color = e.target.value;
    updateProduct();
  });
});

for (let p of tagFilterPrice) {
  p.addEventListener("change", function (e) {
    price = e.target.value;
    updateProduct();
  });
}

let search = "";

// get product data from filter
function updateProduct() {
  getCategory = getDataLocalStorage("categoryProduct");
  console.log("test color", color);
  if (color) {
    listProduct = listProduct.filter((product) => product.color == color);
    updateProduct();
  }

  if (price == 300000) {
    listProduct = listProduct.filter((product) => product.price < 300000);
    updateProduct();
  } else if (price == 500000) {
    listProduct = listProduct.filter(
      (product) => product.price >= 300000 && product.price <= 500000
    );
    updateProduct();
  } else if (price == 900000) {
    listProduct = listProduct.filter(
      (product) => product.price >= 500000 && product.price <= 900000
    );
    updateProduct();
  } else if (price == 1400000) {
    listProduct = listProduct.filter(
      (product) => product.price >= 900000 && product.price <= 1400000
    );
    updateProduct();
  } else if (price == 2000000) {
    listProduct = listProduct.filter(
      (product) => product.price >= 1400000 && product.price <= 2000000
    );
    updateProduct();
  } else if (price == 3000000) {
    listProduct = listProduct.filter(
      (product) => product.price >= 2000000 && product.price <= 3000000
    );
    updateProduct();
  }

  if (search) {
    listProduct = totalProducts.filter((product) =>
      product.name.includes(search)
    );
    updateProduct();
  }

  if (listProduct.length == 0) {
    tagResultProduct.innerHTML = ` <h3>Not found product</h3>`;
  } else {
    tagResultProduct.innerHTML = "";

    for (let product of listProduct) {
      tagResultProduct.innerHTML += `
         <div class="product" id="${product.image2}">
      <img
        id="${product.id}"
        class="item"
        src="../image/products/${product.image1}"
        alt="${product.name}"
      />
       <p>${product.name}</p>
      <p>${new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(
        product.price
      )}VNĐ</p>
      <a href="#" class="buy-now">Mua ngay</a>
    </div>
      `;
    }
  }
}

for (let product of tagProducts) {
  let image2 = "../image/products/" + product.getAttribute("id");
  let tagImg = product.querySelector("img");
  let image1 = tagImg.src;
  product.addEventListener("mouseover", function () {
    setTimeout(function () {
      tagImg.src = image2;
    }, 300);
  });

  product.addEventListener("mouseout", function () {
    setTimeout(function () {
      tagImg.src = image1;
    }, 300);
  });
}
