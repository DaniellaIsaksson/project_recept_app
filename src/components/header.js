import header from "../images/header.png";
import "../styling/App.css";

function Header() {
  return (
    <header>
      <img
        src={header}
        alt="Simple and Tasty Recipes"
        style={{ width: "1000px" }}
      />
      ;
    </header>
  );
}

export default Header;
