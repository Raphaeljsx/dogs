import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "./app.css";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import ProtectedRoute from "./Helper/ProtectedRoute";
import Photo from "./Components/Photo/Photo";
import UserProfile from "./Components/User/UserProfile";
import NotFound from "./Components/NotFound";
import { useEffect } from "react";
import { autoLogin } from "./store/useStore";

function App() {

  useEffect(() => {
    autoLogin();
  },[])

  return (
    <div className="App">
      <BrowserRouter>
       
          <Header />
          <main className="AppBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <Route exact path="foto/:id" element={<Photo />} />
              <Route path="perfil/:user" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="conta/*"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
