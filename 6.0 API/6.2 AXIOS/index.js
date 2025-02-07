import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "http://bored.api.lewagon.com/api/activity"
    );
    const result = response.data;
    res.render("index.ejs", {
      result,
      type: result.type,
      participants: result.participants,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error,
      type: result.type,
      participants: result.participants,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const type = req.body.type;
    const participants = req.body.participants;

    const response = await axios.get(
      `http://bored.api.lewagon.com/api/activity?type=${type}&participants=${participants}`
    );
    const result = response.data;
    res.render("index.ejs", {
      result,
      type: result.type,
      participants: result.participants,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error,
      type: result.type,
      participants: result.participants,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
