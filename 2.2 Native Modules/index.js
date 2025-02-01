const fs = require("fs");

// fs.writeFile("message.txt", "Hello from NodeJS!", (err) => {
//     if (err) throw err;
//     console.log("The file has been saved!");
// });

fs.appendFile("message.txt", "\nHello from Gabriel!", (err) => {
    if (err) throw err;
    console.log("The data has been appended!");
});

fs.readFile("message.txt", encoding="utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
});