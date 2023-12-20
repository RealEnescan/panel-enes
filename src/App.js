import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import './App.css';
import Users from "./pages/users";
import Doctor from "./pages/Doctor";
import { useSelector } from "react-redux";




function App() {

  const { user } = useSelector(state => state.auth);

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={user ? (<Home />) : (<Login />)}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={user ? (<Home />) : (<Login />)} />
        <Route path="/users" element={user ? (<Users />) : (<Login />)} />
        <Route path="/doctor" element={user ? (<Doctor />) : (<Login />)} />
      </Routes>
    </div>
  );
}

export default App;
