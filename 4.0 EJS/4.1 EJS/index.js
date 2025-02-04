import express from "express";

const app = express();
const port  = 3000;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const today = new Date("February 3, 2025 11:13:00").getDay();
    console.log(today);

    if (today >= 1 && today <= 5){
        return res.render("index.ejs", {dayType: "weekday", advice: "it's time to work hard!"});    
    }
    return res.render("index.ejs", {dayType: "weekend", advice: "it's time to have fun!"}); 
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});