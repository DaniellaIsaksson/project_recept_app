import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styling/recipeview.css";

function RecipeView() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [active, setActive] = useState("instructions");

  const fetchDetails = async () => {
    const key = `details_${params.id}`;

    const item = localStorage.getItem(key);

    if (item) {
      try {
        const parsedData = JSON.parse(item);
        setDetails(parsedData);
      } catch (error) {
        console.log(error);
      }
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=5117994a92844cb5a53ef8994617a6ca`
      );
      const detailData = await data.json();

      localStorage.setItem(key, JSON.stringify(detailData));
      setDetails(detailData);
      console.log(detailData);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  return (
    <>
      <div className="wrapper">
        <img src={details.image} alt={details.title} />
        <div className="info">
          <div className="recipe-title">
            <h2>{details.title}</h2>
          </div>
          <div className="button-div">
            <button
              className={active === "instructions" ? "active" : ""}
              onClick={() => setActive("instructions")}
            >
              Instructions
            </button>
            <button
              className={active === "ingredients" ? "active" : ""}
              onClick={() => setActive("ingredients")}
            >
              Ingredients
            </button>
          </div>
          {active === "instructions" && (
            <div>
              <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
              <span
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></span>
            </div>
          )}
          {active == "ingredients" && (
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default RecipeView;
