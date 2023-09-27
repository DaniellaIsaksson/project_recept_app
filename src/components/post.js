import { useEffect, useState } from "react";
import "../styling/home.css";

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

  return (
    <div>
      <h4>Recommended Wine</h4>
      {post.map((recommended) => (
        <div key={recommended.id}>
          <img src={recommended.imageUrl} alt={recommended.title} />
          <div>
            <h4>{recommended.title}</h4>
            <p>{recommended.description}</p>
            <a href={recommended.link}>Learn More</a>
            <p>({recommended.ratingCount})</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
