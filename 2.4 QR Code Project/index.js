import inquirer from 'inquirer';
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([
    {type: "input",
    name: "url",
    message: "Enter a URL",
    default: "https://www.google.com"
    },
  ])
  .then((answers) => {
    const user_input = answers.url;
    
    const qr_svg = qr.image(user_input);
    qr_svg.pipe(fs.createWriteStream('QR_CODE.png'));

    fs.writeFile("URL.txt", user_input, (err) => {
        if (err) throw err;
        console.log("URL saved to file!");
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } 
    console.log("Something else went wrong");
  });
