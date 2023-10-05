import "../styling/card&post.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function WorldRecipe() {
  // State to store the list of cuisine-specific recipes
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  // Function to fetch cuisine-specific recipes from either localStorage or the API
  const getCuisine = async (name) => {
    const key = `cuisine_${name}`;
    const item = localStorage.getItem("cuisine");

    if (item) {
      try {
        // Parse and set cuisine-specific recipes from localStorage if available
        const parsedData = JSON.parse(item);
        setCuisine(parsedData);
      } catch (error) {
        console.error(error);
      }
    } else {
      const getApi = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=5117994a92844cb5a53ef8994617a6ca&cuisine=${name}&number=32`
      );
      const recipes = await getApi.json();

      localStorage.setItem(key, JSON.stringify(recipes.results));
      setCuisine(recipes.results);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);

    // Set up an interval to refresh cuisine-specific recipes every 3 days
    const CuisineUpdate = setInterval(() => {
      getCuisine(params.type);
    }, 3 * 24 * 60 * 60 * 1000);

    return () => clearInterval(CuisineUpdate);
  }, [params.type]);

  return (
    <>
      {/* Display the type of cuisine recipes */}
      <h4 className="card-h4">{params.type} Recipes</h4>
      <div className="card-box">
        {/* Map over the cuisine-specific recipes and display them as cards */}
        {cuisine.map((recipe) => {
          return (
            <div key={recipe.id} className="card">
              {/* Link to the individual recipe view */}
              <Link to={"/recipeview/" + recipe.id} className="link-item">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="card-img-top"
                />
                <h5>{recipe.title}</h5>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default WorldRecipe;
