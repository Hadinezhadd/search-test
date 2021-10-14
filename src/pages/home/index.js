import React, { useState } from "react";
import SearchBar from "../../components/searchBar";
import "./styles.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SearchHistory from "../../components/searchHistory";
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
    <>
      <Header />
      <main role="main">
        <SearchBar
          autoFocus
          shouldRenderClearButton
          shouldRenderSearchButton
          placeholder="search..."
          onChange={(input) => debounceHandleChange({ input, setSuggestions })}
          onClear={() => handleClear({ setSuggestions })}
          onSelection={(value) =>
            handleSelection({ value, history, setHistory })
          }
          suggestions={suggestions}
        />
        <SearchHistory
          history={history}
          deleteHistory={() => deleteHistory({ setHistory })}
          deleteSelectedHistory={(item) =>
            deleteSelectedHistory({ item, history, setHistory })
          }
        />
      </main>
      <Footer />
    </>
  );
};

export default Home;
