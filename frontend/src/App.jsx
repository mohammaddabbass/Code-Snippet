
import "./styles.css";
import AuthPage from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage/>} />
          <Route element={<ProtectedRoute/>}>
          <Route path="/" element={''} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
