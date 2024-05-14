"use strict";

const baseURL = "http://localhost:3030/api/summary";
// let btnDisplay = document.getElementById("displaySummary");

let entries = [];

// btnDisplay.addEventListener("click", getEntry);
// btnDisplay.addEventListener("click", () => {
//   console.log(1, entries);
// });

let btnShow = document.getElementById("inputShow");
let btnHide = document.getElementById("inputHide");
let categoryBox = document.querySelectorAll(".cat");
let btnTest = document.getElementById("sumTestData");

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

// btnTest.addEventListener("click", getEntries);

async function getEntries() {
  try {
    // get entries
    const res = await fetch(baseURL);

    // console.log(res);
    const data = await res.json();

    entries = data.summary;
    // entries = data.summary;

    // console.log(data.summary);

    //   inputOutput.textContent = data.info;
    // sumDisplay.textContent = entries.forEach((element) => {});

    return entries;
  } catch (error) {
    console.log(error);
  }
}

getEntries().then((data) => {
  console.log(data);
  entries = data;

  let totalMinutes = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  let category;
  let i;
  let row;
  let catNum = document.querySelectorAll(".cat");

  function getArrAct() {
    for (let j = 0; j < activties.length; j++) {
      let arrAct = activties[j];
      for (let k = 0; k < arrAct.length; k++) {
        const element = arrAct[k];
        // console.log(element, k);
        entries.forEach((entry, i) => {
          // console.log(i, entry.act);
          if (element === entry.act) {
            console.log(element, "Valid", j, k, entry.min);
            totalMinutes[j][k] += Number(entry.min);
          }
        });
      }
    }
    console.log(totalMinutes);
  }

  getArrAct();
});

const activties = [
  [
    "Individual Counselling",
    "Group/Family Counselling",
    "Psycho-education Workshop Facilitation",
  ],

  [
    "Preperation for client sessions, groups and workshops",
    "Weekly theoretical research on client cases",
    "Write-up of case notes(Individual/group sessions and workshop reflections)",
  ],

  [
    "Preparation and intake",
    "Select a Test Battery (Book and collect test material)",
    "Administration of a Test Battery",
    "Scoring, Interpretation and Report Writing",
    "Preparation and Feedback",
  ],

  [
    "Need Analysis",
    "Resource Allocation",
    "Implementation",
    "Evaluation",
    "Report Writing",
  ],
];
