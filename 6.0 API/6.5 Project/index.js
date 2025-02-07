import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;
const API_URL = "https://secrets-api.appbrewery.com/random";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    const data = result.data;
    return res.render("index.ejs", {
      secret: data.secret,
      user: data.username,
    });
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
