import "../styling/card&post.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  let params = useParams();

  const getRecipes = async (name) => {
    const key = `recipes_${name}`;
    const item = localStorage.getItem("recipes");

    if (item) {
      try {
        const parsedData = JSON.parse(item);
        setRecipes(parsedData);
      } catch (error) {
        console.log(error);
      }
    } else {
      const getApi = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=5117994a92844cb5a53ef8994617a6ca&query=${name}&number=32`
      );
      const recipes = await getApi.json();

      localStorage.setItem(key, JSON.stringify(recipes.results));
      setRecipes(recipes.results);
    }
  };

  useEffect(() => {
    getRecipes(params.type);
    console.log(params.type);

    const RecipeUpdate = setInterval(() => {
      getRecipes(params.type);
    }, 3 * 24 * 60 * 1000);

    return () => clearInterval(RecipeUpdate);
  }, [params.type]);

  return (
    <>
      <h4 className="card-h4">{params.type} Recipes</h4>
      <div className="card-box">
        {recipes.map((recipes) => {
          return (
            <div key={recipes.id} className="card">
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
