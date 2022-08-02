let book = document.getElementById("book");
let author = document.getElementById("author");
let year = document.getElementById("year");

let addBook = document.getElementById("add-book");
let clBooks = document.getElementById("clear-books");
let here = document.querySelector(".here");
let error = document.querySelector(".error p");

let arr = [];

if (localStorage.getItem("book")) {
  arr = JSON.parse(window.localStorage.getItem("book"));
}

addBook.onclick = () => {
  if (book.value == null || book.value == "") {
    error.innerHTML = "please enter your book information";
  } else if (isNaN(parseInt(year.value))) {
    error.innerHTML = "please enter a number in year field";
  } else if (book.value.length >= 25) {
  } else if (author.value == null || author.value == "") {
    author.value = "Unkown";
  } else if (book.value.length >= 25) {
    error.innerHTML = "book name is to long";
  } else if (author.value.length >= 16) {
    error.innerHTML = "author name is to long";
  } else if (year.value == null || year.value == "") {
    year.value = "Unkown year";
  } else if (author.value.length >= 16) {
    error.innerHTML = "author name is to long";
  } else if (year.value.length >= 5) {
    error.innerHTML = "year is to long";
  } else if (year.value.length >= 5) {
    error.innerHTML = "year is to long";
  } else if (year.value.length <= 0) {
    error.innerHTML = "year is to small";
  } else {
    error.innerHTML = "";
    let bookObj = {
      id: Date.now(),
      book: book.value,
      author: author.value,
      year: year.value,
      completed: false,
    };
    arr.push(bookObj);
    addElements(arr);
    addToStorage(arr);
    book.value = "";
    author.value = "";
    year.value = "";
  }
};

function addElements(data) {
  here.innerHTML = "";
  data.forEach((el) => {
    let ul = document.createElement("ul");
    ul.className = "ul-book";
    ul.setAttribute("data-id", el.id);
    let bookName = document.createElement("li");
    bookName.appendChild(document.createTextNode(el.book));
    let author = document.createElement("li");
    author.appendChild(document.createTextNode(el.author));
    let year = document.createElement("li");
    year.appendChild(document.createTextNode(el.year));
    let done = document.createElement("li");
    done.className = "done";
    done.appendChild(document.createTextNode("done"));
    let remove = document.createElement("li");
    remove.className = "remove";
    remove.appendChild(document.createTextNode("remove"));

    if (el.completed) {
      ul.className = "ul-book ddone";
    }

    ul.appendChild(bookName);
    ul.appendChild(author);
    ul.appendChild(year);
    ul.appendChild(done);
    ul.appendChild(remove);
    here.appendChild(ul);
  });
}

function addToStorage(data) {
  window.localStorage.setItem("book", JSON.stringify(data));
}

function getFromStorage() {
  let dataBook = window.localStorage.getItem("book");
  if (dataBook) {
    arr = JSON.parse(dataBook);
    addElements(arr);
  }
}
getFromStorage();

here.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.remove();
    removeFromStrorage(e.target.parentElement.getAttribute("data-id"));
  } else if (e.target.classList.contains("done")) {
    e.target.parentElement.classList.toggle("ddone");
    completedDone(e.target.parentElement.getAttribute("data-id"));
  }
});

function removeFromStrorage(id) {
  arr = arr.filter((el) => el.id != id);
  addToStorage(arr);
}

function completedDone(id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      arr[i].completed === false
        ? (arr[i].completed = true)
        : (arr[i].completed = false);
    }
  }
  addToStorage(arr);
}

clBooks.addEventListener("click", () => {
  here.innerHTML = "";
  window.localStorage.removeItem("book");
});
