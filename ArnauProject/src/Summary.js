// const { plugins } = require("chart.js");
// const { callback } = require("chart.js/helpers");

const baseURL = "http://localhost:3030/api/summary";

let entries = [];

const mycharts = {
  myChart0: document.getElementById("chartCat-1"),
  myChart1: document.getElementById("chartCat-2"),
  myChart2: document.getElementById("chartCat-3"),
  myChart3: document.getElementById("chartCat-4"),
};

for (
  let chartLoop = 0;
  chartLoop < Object.entries(mycharts).length;
  chartLoop++
) {
  let btnChangeStyle = mycharts[`myChart${chartLoop}`];
  btnChangeStyle.addEventListener("click", (styleChart) => {
    btnChangeStyle.style.MaxWidth = "100%";
  });
}

const btnMin = document.getElementById("inputMins");
const btnHour = document.getElementById("inputHours");

async function getEntries() {
  try {
    // get entries
    const res = await fetch(baseURL);

    // console.log(res);
    const data = await res.json();

    entries = data.summary;

    return entries;
  } catch (error) {
    console.log(error);
  }
}
let totalMinutes = [
  [0, 0, 0, 18000],
  [0, 0, 0, 7200],
  [0, 0, 0, 0, 0, 3000],
  [0, 0, 0, 0, 0, 7200],
];

let minBool = true;

btnMin.addEventListener("click", () => {
  debugger;
  for (let j = 0; j < totalMinutes.length; j++) {
    let arrMin = totalMinutes[j];
    for (let k = 0; k < arrMin.length; k++) {
      totalMinutes[j][k] *= 60;
    }
  }

  btnMin.classList.add("hidden");
  btnHour.classList.remove("hidden");
  minBool = true;
  pushArray();
});

btnHour.addEventListener("click", () => {
  for (let j = 0; j < totalMinutes.length; j++) {
    let arrMin = totalMinutes[j];
    for (let k = 0; k < arrMin.length; k++) {
      totalMinutes[j][k] /= 60;
      // totalMinutes[j][k] = Math.round(totalMinutes[j][k], 2);
    }
  }

  btnMin.classList.remove("hidden");
  btnHour.classList.add("hidden");
  minBool = false;
  pushArray();
});

function pushArray() {
  for (let j = 0; j < totalMinutes.length; j++) {
    let arrMin = totalMinutes[j];
    let catNum = j + 1;
    for (let k = 0; k < arrMin.length; k++) {
      let time = arrMin[k];
      let timeNum = k;
      // console.log(time);
      let timeValue = document.querySelector(`.cat-${catNum}  #time${timeNum}`);
      let timeString = document.querySelectorAll(".total-hours");
      // console.log(timeValue);
      //! Get value rounded up to 2 decimal points
      if (!minBool) {
        debugger;
        timeString.forEach((hourMin) => {
          hourMin.textContent = "Hours";
        });
        timeValue.textContent = time.toFixed(2);
      } else {
        // timeString.innerHTML = "Total Minutes Remaining";
        timeString.forEach((hourMin) => {
          hourMin.innerHTML = "Minutes";
        });
        timeValue.textContent = Math.round(time);
      }
    }
  }
}

getEntries().then((data) => {
  // console.log(data);
  entries = data;

  function getArrAct() {
    for (let j = 0; j < activties.length; j++) {
      let arrAct = activties[j];
      for (let k = 0; k < arrAct.length; k++) {
        const element = arrAct[k];
        // console.log(element, k);
        entries.forEach((entry, i) => {
          // console.log(i, entry.act);
          if (element === entry.act) {
            // console.log(element, "Valid", j, k, entry.min);
            totalMinutes[j][k] += Number(entry.min);
          }
        });
        totalMinutes[j][arrAct.length] -= totalMinutes[j][k];
      }
      //! function displayGraphs() {}
      let displaygraph = new Chart(mycharts[`myChart${j}`], {
        type: "doughnut",
        // labels: "Time spend on activity (in minutes)",
        data: {
          labels: dataAct[j],
          datasets: [
            {
              data: totalMinutes[j],
              backgroundColor: colors[j],
              borderColor: borderColors[j],
            },
          ],
        },
        options: {
          legend: {
            labels: {
              fontColor: "white",
            },
          },
          tooltip: {
            callbacks: {
              labelTextColor: function () {
                return "white";
              },
            },
            enabled: false,
          },

          datasets: {
            doughnut: {},
          },
        },
      });
    }
    // console.log(totalMinutes);
  }

  getArrAct();

  // function pushArray() {
  //   for (let j = 0; j < totalMinutes.length; j++) {
  //     let arrMin = totalMinutes[j];
  //     let catNum = j + 1;
  //     for (let k = 0; k < arrMin.length; k++) {
  //       let time = arrMin[k];
  //       let timeNum = k;
  //       // console.log(time);
  //       let timeValue = document.querySelector(
  //         `.cat-${catNum}  #time${timeNum}`
  //       );
  //       // console.log(timeValue);
  //       timeValue.textContent = time;
  //     }
  //   }
  // }

  // function displaygraph() {}

  pushArray();
});

const borderColors = [
  [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(0, 0, 0, 1)",
  ],
  [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(0, 0, 0, 1)",
  ],
  [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(0, 0, 0, 1)",
  ],

  [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(0, 0, 0, 1)",
  ],
];

const colors = [
  [
    "rgba(255, 99, 132,0.4)",
    "rgba(54, 162, 235, 0.4)",
    "rgba(255, 206, 86, 0.4",
    "rgba(0, 0, 0, 0.4)",
  ],
  [
    "rgba(255, 99, 132, 0.4)",
    "rgba(54, 162, 235, 0.4)",
    "rgba(255, 206, 86, 0.4)",
    "rgba(0, 0, 0, 0.4)",
  ],
  [
    "rgba(255, 99, 132, 0.4)",
    "rgba(54, 162, 235, 0.4)",
    "rgba(255, 206, 86, 0.4)",
    "rgba(75, 192, 192, 0.4)",
    "rgba(153, 102, 255, 0.4)",
    "rgba(0, 0, 0, 0.4)",
  ],
  [
    "rgba(255, 99, 132, 0.4)",
    "rgba(54, 162, 235, 0.4)",
    "rgba(255, 206, 86, 0.4)",
    "rgba(75, 192, 192, 0.4)",
    "rgba(153, 102, 255, 0.4)",
    "rgba(0, 0, 0, 0.4)",
  ],
];

const dataAct = [
  [
    "Individual Counselling",
    "Group/Family Counselling",
    "Psycho-education Workshop Facilitation",
    "Total Hours",
  ],

  [
    "Preperation for client sessions, groups and workshops",
    "Weekly theoretical research on client cases",
    "Write-up of case notes\n(Individual/group sessions and workshop reflections)",
    "Total Hours",
  ],

  [
    "Preparation and intake",
    "Select a Test Battery (Book and collect test material)",
    "Administration of a Test Battery",
    "Scoring, Interpretation and Report Writing",
    "Preparation and Feedback",
    "Total Hours",
  ],

  [
    "Need Analysis",
    "Resource Allocation",
    "Implementation",
    "Evaluation",
    "Report Writing",
    "Total Hours",
  ],
];
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
