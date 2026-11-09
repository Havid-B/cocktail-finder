# Cocktail Finder

## About the Project

Cocktail Finder is a web application that helps users discover cocktails using ingredients they have available. Users can search for cocktails by entering an ingredient or request a random cocktail suggestion.

## Technologies Used

- Node.js
- Express.js
- Axios
- EJS
- HTML
- CSS
- TheCocktailDB API

## Features

- Search for cocktails by ingredient.
- Display cocktail names and pictures.
- Display the ingredients and their measurements.
- Show cocktail preparation instructions.
- Generate a random cocktail suggestion.
- Handle invalid inputs and API errors.
- Responsive and styled user interface.

## Installation and Setup

1. Clone or download this repository.
2. Open the project folder in your terminal.
3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your browser and visit:

   `http://localhost:3000`

## API Used

This project uses [TheCocktailDB](https://www.thecocktaildb.com/) to retrieve cocktail information.

## Project Structure

```text
Project Cocktail-finder/
├── public/
│   └── styles/
│       └── main.css
└── views/
    ├── error.ejs
    ├── index.ejs
    └── results.ejs
├── .gitignore
├──index.js
├── package.json
├── package-lock.json
├── README.md
```

## Author

Created as a backend web development capstone project.
