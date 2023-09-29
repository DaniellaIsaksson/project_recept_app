import { useEffect, useState } from "react";
import "../styling/card&post.css";

function Weekly() {
  const [weekly, setWeekly] = useState([]);

  useEffect(() => {
    getWeekly();

    const weeklyUpdate = setInterval(getWeekly, 5 * 24 * 60 * 1000);
    return () => clearInterval(weeklyUpdate);
  }, []);

  const getWeekly = async () => {
    const item = localStorage.getItem("weekly");

    if (item) {
      try {
        const parsedItem = JSON.parse(item);
        setWeekly(parsedItem);
      } catch (error) {}
    } else {
      try {
        const getApi = await fetch(
          "https://api.spoonacular.com/recipes/random?apiKey=5117994a92844cb5a53ef8994617a6ca&number=8&tags=main course"
        );
        const data = await getApi.json();

        localStorage.setItem("weekly", JSON.stringify(data.recipes));
        setWeekly(data.recipes);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h4 className="card-h4">Recommended Recipes</h4>
      <div className="card-box">
        {weekly.length > 0 ? (
          weekly.map((recipe) => {
            return (
              <div key={recipe.id} className="card">
                <div>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="card-img-top"
                  />
                  <h5>{recipe.title}</h5>
                </div>
              </div>
            );
          })
        ) : (
          <p>loading..</p>
        )}
      </div>
    </>
  );
}

export default Weekly;
