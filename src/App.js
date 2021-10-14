import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/searchBar";
import styles from "./App.module.scss";
import Button from "./components/deleteButton";
import { debounce } from "lodash";
import SearchHistory from "./components/searchHistory";
import endpoints from "./constants/endpoints";

const App = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  const handleClear = () => {
    setSuggestions([]);
  };

  //get data from the api
  const getInfo = (input) => {
    const url = endpoints.SEARCH.GET_SEARCH_SERVICE(input);
    axios.get(url).then((res) => {
      if (res.data.items !== undefined) {
        let result = res.data.items.map((a) => a.name);
        setSuggestions(result);
      }
    });
  };
  const debounceHandleChange = debounce((input) => handleChange(input), 500);

  //handle changes on iput and send request for search
  const handleChange = (input) => {
    getInfo(input);
  };

  //delete given item from history list
  const deleteSelectedHistory = (item) => {
    setHistory(history.filter((e) => e !== item));
  };

  //delete all items from history
  const deleteHistory = () => {
    setHistory([]);
  };

  //add a selected item to history
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
        onChange={debounceHandleChange}
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
