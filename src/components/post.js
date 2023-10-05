import { useEffect, useState } from "react";
import "../styling/card&post.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Post() {
  // State to store the recommended wine data
  const [post, setPost] = useState([]);

  useEffect(() => {
    // Fetch recommended wine data when the component mounts
    getPost();

    // Set up an interval to refresh recommended wine data every 3 days
    const recommendedUpdate = setInterval(getPost, 3 * 24 * 60 * 1000);
    // Cleanup the interval when the component unmounts
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
      // Fetch recommended wine data from the API if not in localStorage
      const getApi = await fetch(
        "https://api.spoonacular.com/food/wine/recommendation?apiKey=5117994a92844cb5a53ef8994617a6ca&wine=zinfandel&number=1"
      );
      const data = await getApi.json();

      // Store fetched recommended wine data in localStorage
      localStorage.setItem("post", JSON.stringify(data.recommendedWines));
      setPost(data.recommendedWines);
    }
  };

  // Function to convert average rating to star icons
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
      {/* Map over recommended wine data and display wine information */}
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
              {/* Render star icons based on the average rating */}
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
