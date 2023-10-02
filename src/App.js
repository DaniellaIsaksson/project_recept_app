import "./styling/App.css";
import { Home } from "./pages/home";
import Header from "./components/header";
import Navbar from "./components/navbar";
import WorldRecipe from "./pages/WorldRecipe";
import Recipes from "./pages/Recipes";
import RecipeView from "./views/recipeview";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/worldRecipe/:type" element={<WorldRecipe />} />
          <Route path="/Recipes/:type" element={<Recipes />} />
          <Route path="/recipeview/:id" element={<RecipeView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
