const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Microservice B");
});

app.get("/call-a", async (req, res) => {
  try {
    const response = await fetch("http://192.168.1.102:5001");
    const data = await response.text();
    res.send(`Response from Microservice A: ${data}`);
  } catch (error) {
    res.status(500).send("Error connecting to Microservice A");
  }
});

app.listen(6000, () => {
  console.log("Microservice B running on port 6000");
});
