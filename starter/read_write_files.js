const fs = require("fs");

// Blocking, synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `Whats is the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File has been written!");

// Non-blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
  if (error) return console.log("Error!!!, file does not exist");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (error, data3) => {
      console.log(data3);

      const writtenFile = `${data2} ${data3}`;
      fs.writeFile("./txt/written.txt", writtenFile, (error) => {
        console.log("The written file has been created.");
      });
    });
  });
});
// console.log(textIn);
