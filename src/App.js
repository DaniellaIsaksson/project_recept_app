import "./styling/App.css";
import { Home } from "./pages/home";
import Header from "./components/header";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Home />
    </>
  );
}

export default App;
