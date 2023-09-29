import "../styling/card&post.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function WorldRecipe() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const key = `cuisine_${name}`;
    const item = localStorage.getItem("cuisine");

    if (item) {
      try {
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

    const CuisineUpdate = setInterval(() => {
      getCuisine(params.type);
    }, 3 * 24 * 60 * 60 * 1000);

    return () => clearInterval(CuisineUpdate);
  }, [params.type]);

  return (
    <>
      <h4 className="card-h4">{params.type} Recipes</h4>
      <div className="card-box">
        {cuisine.map((recipe) => {
          return (
            <div key={recipe.id} className="card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
              />
              <h5>{recipe.title}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default WorldRecipe;
