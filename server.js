// const express = require("express");
import { error } from "console";
import express from "express";
import fs from "fs";
const app = express();
const PORT = 3030;
// const fs = require("fs");

// const path = require("path");

app.listen(PORT, () => {
  `Listening on port:${PORT}`;
});

app.use(express.static("ArnauProject"));
app.use(express.json());

const entriesFile = "./ArnauProject/src/txtfiles/entries.txt";

/**
 *
 * @param {string} sumString
 * @returns Array of objects
 */
function decryptString(sumString) {
  let arrSummary = sumString.split("\n").map((entry) => {
    let arrObj = entry.split(",");
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

app.get("/api/summary", (req, res) => {
  // get data from textfile
  fs.readFile(entriesFile, "utf-8", (e, data) => {
    if (e) {
      console.log(e);
      return;
    }

    // send data to client
    const summaryArr = decryptString(data);

    res.status(200).json({ summary: summaryArr });
  });
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
  if (!fileExists(entriesFile)) {
    fs.writeFile(entriesFile, entryString, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  } else {
    fs.readFile(entriesFile, "utf-8", (e, data) => {
      if (e) {
        console.log(e);
        return;
      }
      if (data) {
        console.log(data);
        console.log("Textfile is not empty");
        entryString = "\n" + entryString;
        fs.appendFile(entriesFile, entryString, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      } else {
        console.log("error");
        console.log("Textfile is empty");

        fs.appendFile(entriesFile, entryString, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      }
      // send data to client

      const summaryArr = data;
      console.log(summaryArr);
    });
    // fs.appendFile(entriesFile, entryString, (err) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    // });
  }
}

function fileExists(path) {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });
}
