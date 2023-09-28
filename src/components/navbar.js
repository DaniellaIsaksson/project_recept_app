import { GiChickenOven, GiMeat } from "react-icons/gi";
import { FaFish } from "react-icons/fa";
import { LuDessert } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import { TbToolsKitchen2 } from "react-icons/tb";
import "../styling/navbar.css";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="nav-item">
        <AiFillHome className="icon-style" />
        <h4>Home</h4>
      </div>
      <div className="nav-item">
        <TbToolsKitchen2 className="icon-style" />
        <h4>World Recipe</h4>
      </div>
      <div className="nav-item">
        <FaFish className="icon-style" />
        <h4>Fish and Seafood</h4>
      </div>
      <div className="nav-item">
        <GiChickenOven className="icon-style" />
        <h4>Chicken</h4>
      </div>
      <div className="nav-item">
        <GiMeat className="icon-style" />
        <h4>Meat</h4>
      </div>
      <div className="nav-item">
        <LuDessert className="icon-style" />
        <h4>Dessert</h4>
      </div>
    </div>
  );
}

export default Navbar;
