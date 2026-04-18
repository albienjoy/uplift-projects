import { Home } from "./pages/Home";
import { NavBar } from "./components/NavBar";
import { AboutMe } from "./components/AboutMe";
import { ContactSection } from "./components/ContactSection";
import { Routes, Route } from "react-router";
import { ProjectSection } from "./components/ProjectSection";
import { SkillSection } from "./components/SkillSection";

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-me' element={<AboutMe />} />
        <Route path='/projects' element={<ProjectSection />} />
        <Route path='/skills' element={<SkillSection />} />
        <Route path='/contact' element={<ContactSection />} />
      </Routes>
    </>
  );
};

export default App;
