// clean data

//Call inputs
let title = document.getElementById("title");
let category = document.getElementById("category");
let count = document.getElementById("count");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let create = document.getElementById("create");
let mood = "Create";
let tempi;

// get total

function getTolal() {
  if (price.value != "") {
    let result = +price.value + +tax.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#530808";
  }
}

// save in local storage
let dataproducts;
if (localStorage.product != null) {
  dataproducts = JSON.parse(localStorage.product);
} else {
  dataproducts = [];
}

// create product

create.onclick = function () {
  let newproduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (mood === "Create") {
    if (newproduct.count > 1) {
      for (i = 0; i < newproduct.count; i++) {
        dataproducts.push(newproduct);
      }
    } else {
      dataproducts.push(newproduct);
    }
  } else {
    dataproducts[tempi] = newproduct;
    mood = "Create";
    create.innerHTML = "Create";
    count.style.display = "inline";
  }

  localStorage.setItem("product", JSON.stringify(dataproducts));
  clearData();
  readData();
};

//clear data after inputs

function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read data
function readData() {
  getTolal();
  let table = "";
  for (let i = 0; i < dataproducts.length; i++) {
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${dataproducts[i].title}</td>
        <td>${dataproducts[i].price}</td>
        <td>${dataproducts[i].tax}</td>
        <td>${dataproducts[i].ads}</td>
        <td>${dataproducts[i].discount}</td>
        <td>${dataproducts[i].total}</td>
        <td>${dataproducts[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>

    <tr>
        `;
  }

  // DELETE

  document.getElementById("tbody").innerHTML = table;
  let btndeleteall = document.getElementById("deleteAll");
  if (dataproducts.length > 0) {
    btndeleteall.innerHTML = `<button onclick="deleteAllItems()">Delete All (${dataproducts.length})</button>`;
  } else {
    btndeleteall.innerHTML = "";
  }
}
readData();

//delete Item

let deleteitem = document.getElementById("delete");
function deleteItem(i) {
  dataproducts.splice(i, 1);
  localStorage.product = JSON.stringify(dataproducts);
  readData();
}

// delete all
function deleteAllItems() {
  localStorage.clear();
  dataproducts.splice(0);
  readData();
}

// Upadte

function updateData(i) {
  title.value = dataproducts[i].title;
  price.value = dataproducts[i].price;
  tax.value = dataproducts[i].tax;
  ads.value = dataproducts[i].ads;
  discount.value = dataproducts[i].discount;
  category.value = dataproducts[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "Update";
  tempi = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  readData();
  getTolal();
}

// search

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "btntitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
}

function searchForItem(value) {
  let table = "";
  if (searchMood == "title") {
    for (i = 0; i < dataproducts.length; i++) {
      if (dataproducts[i].title.includes(value)) {
        table += `
    <tr>
        <td>${i}</td>
        <td>${dataproducts[i].title}</td>
        <td>${dataproducts[i].price}</td>
        <td>${dataproducts[i].tax}</td>
        <td>${dataproducts[i].ads}</td>
        <td>${dataproducts[i].discount}</td>
        <td>${dataproducts[i].total}</td>
        <td>${dataproducts[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>

    <tr>
        `;
      }
    }
  } else {
    for (i = 0; i < dataproducts.length; i++) {
      if (dataproducts[i].category.includes(value)) {
        table += `
    <tr>
        <td>${i}</td>
        <td>${dataproducts[i].title}</td>
        <td>${dataproducts[i].price}</td>
        <td>${dataproducts[i].tax}</td>
        <td>${dataproducts[i].ads}</td>
        <td>${dataproducts[i].discount}</td>
        <td>${dataproducts[i].total}</td>
        <td>${dataproducts[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>

    <tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
