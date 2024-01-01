import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  onValue,
  ref,
  push,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let appSettings = {
  databaseURL:
    "https://scrimbaapp-9e709-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

let app = initializeApp(appSettings);
let database = getDatabase(app);
let itemsLocation = ref(database, "Task");

let ulEl = document.getElementById("ul-el");
let btnEl = document.getElementById("btn-el");
let inputEl = document.getElementById("input-el");

btnEl.addEventListener("click", function () {
  let checkValue = inputEl.value;

  if (checkValue.trim() !== "") {
    push(itemsLocation, inputEl.value);
  }

  inputEl.value = "";
});

function clearUlEl() {
  ulEl.innerHTML = "";
}

function appendItem(arr) {
  let itemsID = arr[0];
  let itemsValue = arr[1];

  let itemsCurrentLocation = ref(database, `Task/${itemsID}`);

  let currentItem = document.createElement("li");
  currentItem.innerText = itemsValue;

  currentItem.addEventListener("click", function () {
    remove(itemsCurrentLocation);
  });

  ulEl.appendChild(currentItem);
}

onValue(itemsLocation, function (snapshot) {
  if (snapshot.exists()) {
    clearUlEl();
    let itemsArr = Object.entries(snapshot.val());

    for (let i = 0; i < itemsArr.length; i++) {
      appendItem(itemsArr[i]);
    }
  } else {
    ulEl.innerHTML = "<li>Nothing yet</li>";
  }
});
