
import "./styles.css";
import AuthPage from "./pages/Auth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Add from "./pages/Add";
import SnippetDetails from "./pages/SnippetDetails";


function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage/>} />
          <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/add-snippet" element={<Add/>} />
          <Route path="/snippets/:id" element={<SnippetDetails />} />        </Route>
      </Routes>
    </>
  );
}

export default App;
