
import express from "express";
import axios from "axios";

// Create an Express application and define the server port.
const app = express();
const port = 3000;

// Configure EJS as the view engine for rendering HTML pages.
app.set("view engine", "ejs");

// Serve static files such as CSS from the public folder.
app.use(express.static("public"));

// Allow Express to process form data submitted through POST requests.
app.use(express.urlencoded({ extended: true }));

// Homepage route: display the main page.
app.get("/", (req, res) => {
  res.render("index");
});

// Search route: find cocktails based on an ingredient entered by the user.
app.get("/search", async (req, res) => {
  try {
    // Retrieve the ingredient, remove unnecessary spaces, and handle missing input.
    const ingredient = req.query.ingredient?.trim() || "";

    // Check whether the user submitted an empty or invalid ingredient.
    if (ingredient === "") {
      return res.status(400).render("error", {
        message: "Invalid input. Please enter an ingredient."
      });
    }

    // Send a request to CocktailDB to find cocktails containing the specified ingredient.
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
    );

    // Store the list of cocktails returned by the API.
    const cocktails = response.data.drinks;
    let mappedCocktails = [];

    // Check that the API returned an array of cocktails before processing it.
    if (Array.isArray(cocktails)) {

      // Fetch the full details of each cocktail using its unique ID.
      mappedCocktails = await Promise.all(
        cocktails.map(async (cocktail) => {
          const details = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`
          );

          // Return the full details of the current cocktail.
          return details.data.drinks[0];
        })
      );
    }

    // Render the results page with the cocktail details and page heading.
    res.render("results", {
      cocktails: mappedCocktails,
      heading: "Your Cocktail Search Results"
    });

  } catch (error) {
    // Log API or application errors in the server console.
    console.error("Error fetching cocktails:", error);

    // Display a user-friendly error page if the search request fails.
    return res.status(500).render("error", {
      message: "Sorry, something went wrong. Please try again later."
    });
  }
});

// Random route: retrieve and display a randomly selected cocktail.
app.get("/random", async (req, res) => {
  try {
    // Request a random cocktail from the CocktailDB API.
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    // Render the results page with the random cocktail and an appropriate heading.
    res.render("results", {
      cocktails: response.data.drinks,
      heading: "Here's Your Surprise Cocktail!"
    });

  } catch (error) {
    // Log any errors encountered while fetching the random cocktail.
    console.error("Error fetching random cocktail:", error);

    // Display a user-friendly error page.
    return res.status(500).render("error", {
      message: "Sorry, something went wrong. Please try again later."
    });
  }
});

// Start the server and display its local address in the console.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
