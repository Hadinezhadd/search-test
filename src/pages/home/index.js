import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import SearchHistory from "../../components/SearchHistory";
import Layout from "../../components/Layout";
import {
  debounceHandleChange,
  handleClear,
  handleSelection,
  deleteHistory,
  deleteSelectedHistory,
} from "./methods";

const Home = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  return (
    <Layout>
      <SearchBar
        autoFocus
        shouldRenderClearButton
        shouldRenderSearchButton
        placeholder="search..."
        onChange={(input) => debounceHandleChange({ input, setSuggestions })}
        onClear={() => handleClear({ setSuggestions })}
        onSelection={(value) => handleSelection({ value, history, setHistory })}
        suggestions={suggestions}
      />
      <SearchHistory
        history={history}
        deleteHistory={() => deleteHistory({ setHistory })}
        deleteSelectedHistory={(item) =>
          deleteSelectedHistory({ item, history, setHistory })
        }
      />
    </Layout>
  );
};

export default Home;
