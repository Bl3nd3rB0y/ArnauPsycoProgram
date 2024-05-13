"use strict";

let Cat = 1;

function getCat() {
  Cat = document.querySelector("#dropCat").value;
  console.log(Cat);

  return Cat;
}

document.querySelector("#dropCat").addEventListener("change", toggleCat);
console.log(document);

let catIndex;
let time;
let checkedindex;
let value;
let btnSave;
let entryTitle;
let entryLoc;
let entryDate;
let inputOutput;
let entryMessage;
let form;
let locLog;
let catTest;

function toggleCat() {
  catIndex = getCat();
  const groups = document.querySelectorAll(`.group`);
  groups.forEach((Element) => {
    if (Element.id === `group${catIndex}`) {
      Element.classList.remove("hidden");
    } else {
      Element.classList.add("hidden");
    }
  });
  //*Get Activity

  document
    .querySelectorAll(`#cat${catIndex} > .option .radio`)
    .forEach((radio) =>
      radio.addEventListener("click", () => {
        const options = document.querySelectorAll(
          `#cat${catIndex} > .option .radio`
        );

        options.forEach((option) => {
          if (option.checked === true) {
            checkedindex = +option.value;
            catTest = +option.value;
            value = categories[`arr${catIndex}`][checkedindex];

            console.log(value);
          }
        });
      })
    );

  document
    .querySelector(`#entryLoc${catIndex}`)
    .addEventListener("change", () => {
      locLog = document.querySelector(`#entryLoc${catIndex}`).value;

      entryLoc = locations[`loc${locLog}`];
      console.log(entryLoc);
    });

  document
    .querySelector(`#dateEntry${catIndex}`)
    .addEventListener("change", () => {
      entryDate = document.querySelector(`#dateEntry${catIndex}`).value;
      console.log(entryDate);
    });

  document
    .querySelector(`#Cat${catIndex}Time`)
    .addEventListener("change", () => {
      time = document.querySelector(`#Cat${catIndex}Time`).value;

      console.log(time);
    });

  btnSave = document.getElementById(`cat${catIndex}save`);

  entryTitle = titles[`title${catIndex}`];

  inputOutput = document.getElementById("logEntry");
  entryMessage = document.querySelector(".entryOutput");
  btnSave.addEventListener("click", (e) => {
    e.preventDefault();
    if (dataValid()) {
      inputOutput.textContent = saveString();
      entryMessage.classList.remove("hidden");
      btnSave.classList.add("hidden");
    }
  });

  // let catTest = document.querySelectorAll(`#cat${catIndex} > .option .radio`);

  let timeTest = document.querySelector(`#Cat${catIndex}Time`);
  let dateTest = document.querySelector(`#dateEntry${catIndex}`);
  let locTest = (locLog = document.querySelector(`#entryLoc${catIndex}`));

  let errorMessage = document.querySelectorAll(`.error${catIndex}`);

  function dataValid() {
    let valid = true;

    errorMessage.forEach((errorMessage) => {
      errorMessage.classList.add("hidden");
    });

    // errorMessage.classList.add("hidden");
    if (catTest === undefined) {
      valid = false;
      if (errorMessage[0].classList.contains("actError")) {
        errorMessage[0].classList.remove("hidden");
      }
    }
    if (locTest.value === "0") {
      valid = false;
      if (errorMessage[1].classList.contains("locError")) {
        errorMessage[1].classList.remove("hidden");
      }
    }
    if (!dateTest.value) {
      valid = false;
      if (errorMessage[2].classList.contains("dateError")) {
        errorMessage[2].classList.remove("hidden");
      }
    }
    if (timeTest.value <= 0) {
      valid = false;
      if (errorMessage[3].classList.contains("timeError")) {
        errorMessage[3].classList.remove("hidden");
      }
    }
    return valid;
  }

  //TEST DATA
  //~  btnTest = addEventListener("click", (e) => {
  //~   e.preventDefault;
  //~   let catTest = document.querySelector(`#cat${catIndex}`);
  //~   let timeTest = document.querySelector(`#Cat${catIndex}Time`);

  //~   let dateTest = document.querySelector(`#dateEntry${catIndex}`);
  //~   let locTest = (locLog = document.querySelector(`#entryLoc${catIndex}`));
  //~   console.log(catTest.value, timeTest.value, dateTest.value, locTest.value);
  //~ });
}
const btnDeny = document.getElementById("denyEntry");
const btnConfirm = document.getElementById("confirmEntry");

btnConfirm.addEventListener("click", postEntry);
btnConfirm.addEventListener("click", () => {
  // entryMessage.classList.add("hidden");
  // btnSave.classList.remove("hidden");
  location.reload();
});

btnDeny.addEventListener("click", (e) => {
  e.preventDefault();
  entryMessage.classList.add("hidden");
  btnSave.classList.remove("hidden");
});

const titles = {
  title1: "Engagement with Practicum Site",
  title2: "Preparation & Documentation of Client Engagement",
  title3: "Psychometric Testing and Research",
  title4: "Community Intervention",
};

const baseURL = "http://localhost:3030";

async function getEntry(e) {
  e.preventDefault();
  const res = await fetch(baseURL, {
    method: "GET",
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
  inputOutput.textContent = data.info;
}

async function postEntry() {
  // e.preventDefault();

  const res = await fetch(baseURL, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      parcel: `\n${
        titles[`title${getCat()}`]
      }#${value}#${entryLoc}#${entryDate}#${time}`,
    }),
  });
}

function saveString() {
  let string = `Do you want to save the current entry?`;
  return string;
}

const locations = {
  loc1: "SAICAP",
  loc2: "Campus",
};

const categories = {
  arr1: [
    "Individual Counselling",
    "Group/Family Counselling",
    "Psycho-education Workshop Facilitation",
  ],

  arr2: [
    "Preperation for client sessions, groups and workshops",
    "Weekly theoretical research on client cases",
    "Write-up of case notes(Individual/group sessions and workshop reflections)",
  ],

  arr3: [
    "Preparation and intake",
    "Select a Test Battery (Book and collect test material)",
    "Administration of a Test Battery",
    "Scoring, Interpretation and Report Writing",
    "Preparation and Feedback",
  ],

  arr4: [
    "Need Analysis",
    "Resource Allocation",
    "Implementation",
    "Evaluation",
    "Report Writing",
  ],
};
let btnTest = document.getElementById("test");
