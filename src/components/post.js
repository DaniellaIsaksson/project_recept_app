import { useEffect, useState } from "react";
import "../styling/card&post.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Post() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPost();

    const recommendedUpdate = setInterval(getPost, 3 * 24 * 60 * 1000);
    return () => clearInterval(recommendedUpdate);
  }, []);

  const getPost = async () => {
    const item = localStorage.getItem("post");

    if (item) {
      try {
        const parsedData = JSON.parse(item);
        setPost(parsedData);
      } catch (error) {
        console.error(error);
      }
    } else {
      const getApi = await fetch(
        "https://api.spoonacular.com/food/wine/recommendation?wine=zinfandel&apiKey=ca828aec25dc435d988a20d538bd09f7&number=1"
      );
      const data = await getApi.json();

      localStorage.setItem("post", JSON.stringify(data.recommendedWines));
      setPost(data.recommendedWines);
    }
  };

  const convertRating = (averageRating) => {
    const totalStars = 5;
    const rating = (averageRating * 5).toFixed(1);
    console.log({ rating });
    const starIcons = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        starIcons.push(<i key={i} className="bi bi-star-fill"></i>);
      } else if (i - 0.5 <= rating) {
        starIcons.push(<i key={i} className="bi bi-star-half"></i>);
      } else {
        starIcons.push(<i key={i} className="bi bi-star"></i>);
      }
    }

    return starIcons;
  };

  return (
    <div>
      <h4 className="post-header">Recommended Wine</h4>
      {post.map((recommended) => (
        <div key={recommended.id} className="recommended-wine">
          <img
            src={recommended.imageUrl}
            alt={recommended.title}
            style={{ width: "100px" }}
          />
          <div className="wine-content">
            <h4>{recommended.title}</h4>
            <p>{recommended.description}</p>
            <a href={recommended.link}>Learn More</a>
            <div className="star-rating">
              {convertRating(recommended.averageRating)}
              <p>({recommended.ratingCount})</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
