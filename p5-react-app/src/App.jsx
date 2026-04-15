import { ToastContainer } from "react-toastify";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { ActivityDetails } from "./pages/ActivityDetails";
import { ActivityUpload } from "./pages/ActivityUpload";
import { NotFound } from "./pages/NotFound";
import { NavBar } from "./components/NavBar";
import { EditActivity } from "./components/EditActivity";
import { RaceList } from "./components/RaceList";
import { RaceRegistration } from "./components/RaceRegistration";

function App() {
  return (
    <>
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <NavBar />
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='/profile'>
            <Route index element={<Dashboard />} />
            <Route path=':id' element={<ActivityDetails />} />
            <Route path='upload' element={<ActivityUpload />} />
          </Route>

          <Route path='/edit'>
            <Route index element={<EditActivity />} />
            <Route path=':id' element={<EditActivity />} />
          </Route>

          <Route path='/races'>
            <Route index element={<RaceList />} />
            <Route path='list' element={<RaceList />} />
            <Route path='register/:id' element={<RaceRegistration />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
