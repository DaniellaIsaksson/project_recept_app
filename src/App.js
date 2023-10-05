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
      {/* wrapping the application in a React Router*/}
      <BrowserRouter>
        <Header />
        <Navbar />
        {/*Defining routes for diffrent pages*/}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Routes  with a dynamic parameters 'type' and `id` */}
          <Route path="/worldRecipe/:type" element={<WorldRecipe />} />
          <Route path="/Recipes/:type" element={<Recipes />} />
          <Route path="/recipeview/:id" element={<RecipeView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
