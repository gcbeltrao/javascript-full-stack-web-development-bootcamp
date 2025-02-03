import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if (req.body.password == "ILoveProgramming"){
        res.sendFile(__dirname + "/public/secrets.html");
    };
    res.redirect("/");
});

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`)
})