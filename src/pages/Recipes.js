import "../styling/card&post.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Recipes() {
  // State to store the list of recipes
  const [recipes, setRecipes] = useState([]);
  // Get the 'type' parameter from the route
  let params = useParams();

  // Function to fetch recipes from either localStorage or the API
  const getRecipes = async (name) => {
    const key = `recipes_${name}`;
    const item = localStorage.getItem("recipes");

    if (item) {
      try {
        // Parse and set recipes from localStorage if available
        const parsedData = JSON.parse(item);
        setRecipes(parsedData);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Fetch recipes from the API if not in localStorage
      const getApi = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=5117994a92844cb5a53ef8994617a6ca&query=${name}&number=32`
      );
      const recipes = await getApi.json();

      // Store fetched recipes in localStorage
      localStorage.setItem(key, JSON.stringify(recipes.results));
      setRecipes(recipes.results);
    }
  };

  // Fetch recipes when 'params.type' changes or when the component mounts
  useEffect(() => {
    getRecipes(params.type);
    console.log(params.type);

    // Set up an interval to refresh recipes every 3 days
    const RecipeUpdate = setInterval(() => {
      getRecipes(params.type);
    }, 3 * 24 * 60 * 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(RecipeUpdate);
  }, [params.type]);

  return (
    <>
      {/* Display the type of recipes */}
      <h4 className="card-h4">{params.type} Recipes</h4>
      <div className="card-box">
        {/* Map over the recipes and display them as cards */}
        {recipes.map((recipes) => {
          return (
            <div key={recipes.id} className="card">
              {/* Link to the individual recipe view */}
              <Link to={"/recipeview/" + recipes.id} className="link-item">
                <img
                  src={recipes.image}
                  alt={recipes.title}
                  className="card-img-top"
                />
                <h5>{recipes.title}</h5>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Recipes;
