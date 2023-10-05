import { GiChickenOven, GiMeat } from "react-icons/gi";
import { LuDessert } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import { TbToolsKitchen2 } from "react-icons/tb";
import "../styling/navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  // State to control the dropdown menu
  const [dropDown, setDropDown] = useState(false);

  // Function to toggle the dropdown menu
  const toggle = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="Navbar">
      <NavLink to={"/"} className="nav-item">
        <AiFillHome className="icon-style" />
        <h4>Home</h4>
      </NavLink>
      {/* World Recipe Link with Dropdown */}
      <div
        className="nav-item"
        to="/world-recipe"
        onMouseEnter={() => setDropDown(true)}
        onMouseLeave={() => setDropDown(false)}
      >
        <TbToolsKitchen2 className="icon-style" />
        <h4>World Recipe</h4>
        {dropDown && (
          <div className="dropdown">
            <ul>
              {/* Links to different cuisine categories */}
              <NavLink to={"/worldRecipe/Italian"} className="li-item">
                Italian
              </NavLink>
              <NavLink to={"/worldRecipe/Greek"} className="li-item">
                Greek
              </NavLink>
              <NavLink to={"/worldRecipe/Mexican"} className="li-item">
                Mexican
              </NavLink>
              <NavLink to={"/worldRecipe/Asian"} className="li-item">
                Asian
              </NavLink>
              <NavLink to={"/worldRecipe/Indian"} className="li-item">
                Indian
              </NavLink>
            </ul>
          </div>
        )}
      </div>
      <NavLink to={"/Recipes/Chicken"} className="nav-item">
        <GiChickenOven className="icon-style" />
        <h4>Chicken</h4>
      </NavLink>
      <NavLink to={"/Recipes/Meat"} className="nav-item">
        <GiMeat className="icon-style" />
        <h4>Meat</h4>
      </NavLink>
      <NavLink to={"/Recipes/Dessert"} className="nav-item">
        <LuDessert className="icon-style" />
        <h4>Dessert</h4>
      </NavLink>
    </div>
  );
}

export default Navbar;
