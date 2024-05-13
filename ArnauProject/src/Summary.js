"use strict";

const baseURL = "http://localhost:3030/summary";
// let btnDisplay = document.getElementById("displaySummary");

let entries = [];

// btnDisplay.addEventListener("click", getEntry);
// btnDisplay.addEventListener("click", () => {
//   console.log(1, entries);
// });

let btnShow = document.getElementById("inputShow");
let btnHide = document.getElementById("inputHide");
let categoryBox = document.querySelectorAll(".cat");

btnShow.addEventListener("click", (e) => {
  e.preventDefault();
  btnShow.classList.add("hidden");
  btnHide.classList.remove("hidden");
  categoryBox.forEach((categoryBox) => {
    categoryBox.classList.remove("hidden");
  });
});

btnHide.addEventListener("click", (e) => {
  e.preventDefault();
  btnHide.classList.add("hidden");
  btnShow.classList.remove("hidden");
  categoryBox.forEach((categoryBox) => {
    categoryBox.classList.add("hidden");
  });
});

async function getEntry(e) {
  e.preventDefault();
  let res = await fetch(baseURL, {
    method: "GET",
  });

  console.log(res);
  let data = await res.json();

  entries = await data.summary;
  // entries = data.summary;

  console.log(data.summary);
  //   inputOutput.textContent = data.info;
  sumDisplay.textContent = entries.forEach((element) => {});
}

// btnDisplay.addEventListener("click", () => {
//   console.log(entries);
// });
