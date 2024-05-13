const express = require("express");
const app = express();
const PORT = 3030;
const fs = require("fs");
// const path = require("path");

app.listen(PORT, () => {
  `Listening on port:${PORT}`;
});

app.use(express.static("ArnauProject"));
app.use(express.json());

const filePath = "./ArnauProject/src/txtfiles/entries.txt";

const getSummery = function () {
  // let sumString;
  let temp;
  if (fileExists(filePath)) {
    temp = fs.readFileSync(filePath, "utf-8");
  }
  return temp;
};

const sumString = getSummery();

function getArray() {
  console.log(1, sumString);
  let arrSummary = sumString.split("\n").map((entry) => {
    let arrObj = entry.split("#");
    let objEntry = {
      cat: arrObj[0],
      act: arrObj[1],
      loc: arrObj[2],
      date: arrObj[3],
      min: arrObj[4],
    };
    return objEntry;
  });
  console.log(2, arrSummary);
  return arrSummary;
}

let sumDisplay;

app.get("/summary", (req, res) => {
  sumDisplay = getArray();
  res.status(200).json({ summary: sumDisplay });
});

app.post("/", (req, res) => {
  const { parcel } = req.body;
  console.log(parcel);
  if (!parcel) {
    res.status(400).send({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  saveEntry(parcel);
});

function saveEntry(entryString) {
  if (!fileExists(filePath)) {
    fs.writeFile(filePath, entryString, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  } else {
    fs.appendFile(filePath, entryString, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }
}

function fileExists(path) {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });
}
