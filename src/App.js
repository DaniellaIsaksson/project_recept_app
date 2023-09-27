import "./styling/App.css";
import { Home } from "./pages/home";
import Header from "./components/header";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Home />
    </>
  );
}

export default App;
