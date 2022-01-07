

import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import BlogDetails from "./pages/blog-details";
import Categorys from "./pages/categorys";
import Homepage from "./pages/homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />

          <Route path="/details/:id" element={<BlogDetails />} />

          <Route path="/category/:id" element={<Categorys />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
