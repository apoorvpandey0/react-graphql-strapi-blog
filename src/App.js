import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import {ApolloClient, InMemoryCache,ApolloProvider} from "@apollo/client";

import Header from "./components/Header";
import BlogDetails from "./pages/blog-details";
import Categorys from "./pages/categorys";
import Homepage from "./pages/homepage";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache()
  });
  return (
    <Router>
      <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />

          <Route path="/details/:id" element={<BlogDetails />} />

          <Route path="/category/:id" element={<Categorys />} />
        </Routes>
      </div>
      </ApolloProvider>
    </Router>
  );
}


export default App;
