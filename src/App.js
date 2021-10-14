import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/searchBar";
import styles from "./App.module.scss";
import Button from "./components/deleteButton";
import SearchHistory from "./components/searchHistory";
import endpoints from "./constants/endpoints";

const App = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  const handleClear = () => {
    setSuggestions([]);
  };

  const getInfo = () => {
    const url = endpoints.SEARCH.GET_SEARCH_SERVICE(query);
    axios.get(url).then((res) => {
      if (res.data.items !== undefined) {
        let result = res.data.items.map((a) => a.name);
        setSuggestions(result);
      }
    });
  };

  const handleChange = (input) => {
    setQuery(input);
    getInfo();
  };

  const deleteSelectedHistory = (item) => {
    setHistory(history.filter((e) => e !== item));
  };

  const deleteHistory = () => {
    setHistory([]);
  };

  const handleSelection = (value) => {
    if (value) {
      setHistory([...history, { value, date: new Date().toLocaleString() }]);
    }
  };



  return (
    <main role="main">
      <SearchBar
        autoFocus
        shouldRenderClearButton
        shouldRenderSearchButton
        placeholder="search..."
        onChange={handleChange}
        onClear={handleClear}
        onSelection={handleSelection}
        suggestions={suggestions}
        delay={500}
      />
      <SearchHistory
        history={history}
        deleteHistory={deleteHistory}
        deleteSelectedHistory={deleteSelectedHistory}
      />
      <div className={styles.buttonWrapper}>
        <p>designed button for test</p>
        <Button />
      </div>
    </main>
  );
};

export default App;
