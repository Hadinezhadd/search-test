import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/searchBar";
import styles from "./components/search.module.css";
import Button from "./components/deleteButton";
import SearchHistory from "./components/searchHistory";

const App = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  const handleClear = () => {
    setSuggestions([]);
  };

  const getInfo = () => {
    const url = `${process.env.REACT_APP_SEARCH_URL}q=${query}&language=javascript`;
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

  const handleSearch = (value) => {};

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
        onSearch={handleSearch}
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
