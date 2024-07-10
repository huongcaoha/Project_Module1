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
const currentUrl = new URL(window.location.href);
let getSlide = currentUrl.searchParams.get("slide");
let getCategory = currentUrl.searchParams.get("category");
let getSearch = currentUrl.searchParams.get("search");

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
// get slide image
if (getSlide != null && getSlide >= 0 && getSlide <= 9) {
  slide.src = arraySlide[getSlide];
} else {
  slide.src = arraySlide[0];
}

let totalProductJson = localStorage.getItem("products");
let totalProducts = JSON.parse(totalProductJson);
let totalCategoryJson = localStorage.getItem("category");
let totalCategory = JSON.parse(totalCategoryJson);
let tagResultProduct = document.querySelector(".resultProduct");
let tagFilterCategories = document.getElementById("categories");
let tagFilterColor = document.querySelectorAll(".color");
let tagFilterPrice = document.querySelectorAll(".price");
// get information filter
let listProduct = [];
let category = "";
tagFilterCategories.addEventListener("change", function () {
  category = this.value;
});
if (getCategory != null) {
  category = getCategory;
} else {
  category = "all";
}

if (category == "all" || category == null) {
  listProduct = totalProducts;
} else if (category != null) {
  listProduct = totalProducts.filter((product) => product.category == category);
}

let color = "";
for (let c of tagFilterColor) {
  c.addEventListener("change", function (e) {
    color = e.target.value;
  });
}
if (color != null) {
  listProduct = listProduct.filter((product) => product.color == color);
}

let price = 0;
for (let p of tagFilterPrice) {
  p.addEventListener("change", function (e) {
    price = e.target.value;
  });
}
if (price == 300000) {
  listProduct = listProduct.filter((product) => product.price < 300000);
} else if (price == 500000) {
  listProduct = listProduct.filter(
    (product) => product.price >= 300000 && product.price <= 500000
  );
} else if (price == 900000) {
  listProduct = listProduct.filter(
    (product) => product.price >= 500000 && product.price <= 900000
  );
} else if (price == 1400000) {
  listProduct = listProduct.filter(
    (product) => product.price >= 900000 && product.price <= 1400000
  );
} else if (price == 2000000) {
  listProduct = listProduct.filter(
    (product) => product.price >= 1400000 && product.price <= 2000000
  );
} else if (price == 3000000) {
  listProduct = listProduct.filter(
    (product) => product.price >= 2000000 && product.price <= 3000000
  );
}

let search = "";
if (search != null) {
  listProduct = totalProducts.filter((product) =>
    product.name.includes(search)
  );
}

// get product data from filter

if (getSlide >= 1 && getSlide <= 9) {
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

if (listProduct.length == 0) {
  tagResultProduct.innerHTML = ` <h3>Not found product</h3>`;
}

let tagProducts = document.querySelectorAll(".product");
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
