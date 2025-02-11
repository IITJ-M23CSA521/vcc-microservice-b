const axios = require("axios");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Microservice B  ");
});

app.get("/call-a", async (req, res) => {
  try {
    const { data } = await axios.get("http://192.168.0.182:5001");

    res.send({
      success: true,
      message: "Successfully received response from Microservice A ",
      data,
    });
  } catch (error) {
    console.error("Error calling Microservice A:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to connect to Microservice A ",
      error: error.message,
    });
  }
});

app.listen(6000, () => {
  console.log("Microservice B running on port 6000");
});
