import { GiChickenOven, GiMeat } from "react-icons/gi";
import { FaFish } from "react-icons/fa";
import { LuDessert } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import { TbToolsKitchen2 } from "react-icons/tb";
import "../styling/navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [dropDown, setDropDown] = useState(false);

  const toggle = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="Navbar">
      <NavLink className="nav-item">
        <AiFillHome className="icon-style" />
        <h4>Home</h4>
      </NavLink>
      <NavLink
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
              <NavLink to={"/worldRecipe/Italian"}>Italian </NavLink>
              <NavLink to={"/worldRecipe/Greek"}>Greek </NavLink>
              <NavLink to={"/worldRecipe/Mexican"}>Mexican </NavLink>
              <NavLink to={"/worldRecipe/Asian"}>Asian </NavLink>
              <NavLink to={"/worldRecipe/Indian"}>Indian </NavLink>
            </ul>
          </div>
        )}
      </NavLink>
      <NavLink className="nav-item">
        <FaFish className="icon-style" />
        <h4>Fish and Seafood</h4>
      </NavLink>
      <NavLink className="nav-item">
        <GiChickenOven className="icon-style" />
        <h4>Chicken</h4>
      </NavLink>
      <NavLink className="nav-item">
        <GiMeat className="icon-style" />
        <h4>Meat</h4>
      </NavLink>
      <NavLink className="nav-item">
        <LuDessert className="icon-style" />
        <h4>Dessert</h4>
      </NavLink>
    </div>
  );
}

export default Navbar;
