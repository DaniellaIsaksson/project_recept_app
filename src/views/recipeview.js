import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styling/recipeview.css";

function RecipeView() {
  // get the dynamic `id` parameter from the route
  let params = useParams();
  // Initialize state to store recipe details and the active abt
  const [details, setDetails] = useState({});
  const [active, setActive] = useState("instructions");

  // Function to fetch recipe details from either localStorage or the API
  const fetchDetails = async () => {
    const key = `details_${params.id}`;

    const item = localStorage.getItem(key);

    if (item) {
      try {
        // Parse and set details from localStorage if available
        const parsedData = JSON.parse(item);
        setDetails(parsedData);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Fetch details from the API if not in localStorage
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=5117994a92844cb5a53ef8994617a6ca`
      );
      const detailData = await data.json();

      // Store fetched details in localStorage
      localStorage.setItem(key, JSON.stringify(detailData));
      setDetails(detailData);
      console.log(detailData);
    }
  };

  // Call fetchDetails when 'params.id' changes
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
            {/* Toggle between 'instructions' and 'ingredients' tabs */}
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
              {/* Render recipe summary and instructions */}
              <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
              <span
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></span>
            </div>
          )}
          {active == "ingredients" && (
            <ul>
              {/* Render list of ingredients */}
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
