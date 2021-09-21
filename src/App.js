import "./App.css";
import {useState, useEffect} from 'react';
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import AboutView from "./components/AboutView";
import MovieView from "./components/MovieView";
import SearchView from "./components/SearchView"
import { Switch, Route } from "react-router-dom";

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if(searchText) {
      console.log(searchText, "is the search text")
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=01957ee3309bafdb81238954f4159e50&language=en-US&query=${searchText}&page=1&include_adult=false
      `)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.results)
      })
    }
  }, [searchText])

  return (
    <div>
      <NavBar searchText={searchText} setSearchText={setSearchText}/>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" component={AboutView} />
        <Route path="/movies/:id" component={MovieView} />
        <Route path="/search">
          <SearchView keyword={searchText} searchResults={searchResults} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
