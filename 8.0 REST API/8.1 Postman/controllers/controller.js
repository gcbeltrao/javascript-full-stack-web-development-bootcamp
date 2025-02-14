const masterKey = process.env.masterKey;
import jokes from "../models/jokes.js";

export const allJokes = (req, res) => {
  return res.json(jokes);
};

export const randomJoke = (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return res.json(jokes[randomIndex]);
};

export const specificJoke = (req, res) => {
  const id = parseInt(req.params.id);
  const jokeIndex = jokes.findIndex((joke) => joke.id === id);
  return res.json(jokes[jokeIndex]);
};

export const filterJoke = (req, res) => {
  const type = req.query.type;
  const filteredActivities = jokes.filter(
    (joke) => joke.jokeType.toLowerCase() == type.toLowerCase()
  );
  return res.json(filteredActivities);
};

export const newJoke = (req, res) => {
  const newJoke = {
    id: jokes.length + 1,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  const joke = jokes.find(
    (joke) =>
      joke.jokeText.toLowerCase() == newJoke.jokeText.toLowerCase() &&
      joke.jokeType.toLowerCase() == newJoke.jokeType.toLowerCase()
  );
  if (joke) {
    return res.json(`Joke already exists, it's the joke with id: ${joke.id}`);
  }
  jokes.push(newJoke);
  return res.json(newJoke);
};

export const replaceJoke = (req, res) => {
  const id = parseInt(req.params.id);
  if (!req.body.text || !req.body.type) {
    return res.status(422).json("Invalid input. No jokes were modified.");
  }
  const replacementJoke = {
    id: id,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  const jokeIndex = jokes.findIndex((joke) => joke.id === id);
  if (jokeIndex != -1) {
    jokes[jokeIndex] = replacementJoke;
    return res.json(replacementJoke);
  }
  return res.json("There's no joke with that id!");
};

export const editJoke = (req, res) => {
  const id = parseInt(req.params.id);
  const jokeIndex = jokes.findIndex((joke) => joke.id === id);
  if (jokeIndex != -1) {
    const replacementJoke = {
      id: id,
      jokeText: req.body.text || jokes[jokeIndex].jokeText,
      jokeType: req.body.type || jokes[jokeIndex].jokeType,
    };
    jokes[jokeIndex] = replacementJoke;
    return res.json(jokes[jokeIndex]);
  }
  return res
    .status(404)
    .json(`Joke with id: ${id} not found. No jokes were modified.`);
};

export const deleteJoke = (req, res) => {
  const id = parseInt(req.params.id);
  const jokeIndex = jokes.findIndex((joke) => joke.id === id);
  if (jokeIndex != -1) {
    jokes.splice(jokeIndex, 1);
    return res.json("Joke deleted!");
  }
  return res
    .status(404)
    .json(`Joke with id: ${id} not found. No jokes were deleted.`);
};

export const deleteAll = (req, res) => {
  const key = req.query.key;
  if (key == masterKey) {
    jokes.length = 0;
    return res.json("All jokes are deleted!");
  }
  return res.status(404).json("Invalid key. No jokes were deleted.");
};
