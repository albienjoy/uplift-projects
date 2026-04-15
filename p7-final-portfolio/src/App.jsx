import {Router} from "react-router";
import {Home} from "./pages/Home";
import { LandingPage } from "./pages/LandingPage";
import { NavBar } from "./components/NavBar";

const App = () => {
  return (
    <>
    {/* <LandingPage /> */}
    <NavBar />
    
    <Router>
      <Router path="/" element={<Home />} />         
      <Router path="/home" element={<Home />} />
    </Router>
    </>

  );
};


export default App;