// Sillyname

//const generateName = require("sillyname");
import generateName from "sillyname";

const sillyName = generateName();

console.log(`My name is ${sillyName}.`);

// Superhero with ESM

import {randomSuperhero} from "superheroes";

const superhero = randomSuperhero();

console.log(`I am ${superhero}.`);