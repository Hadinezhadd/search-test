import React from "react";
import ReactDOM from "react-dom";
import autoBind from "react-autobind";

import SearchBar from "./components/searchBar";

import words from "./components/words.json";
import styles from "./components/search.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      history: [],
    };

    autoBind(this, "handleChange", "handleClear", "handleSelection");
  }

  handleClear() {
    this.setState({
      suggestions: [],
    });
  }

  handleChange(input) {
    this.setState({
      suggestions: words.filter((word) => word.startsWith(input)),
    });
  }

  deleteSelectedHistory(item) {
    this.setState((prevState) => ({
      history: prevState.history.filter((e) => e !== item),
    }));
  }

  deleteHistory(item) {
    this.setState({
      history: [],
    });
  }

  handleSelection(value) {
    if (value) {
      console.info(`Selected "${value}"`);
      this.setState({
        history: [...this.state.history, value],
      });
    }
  }

  handleSearch(value) {
    if (value) {
      console.info(`Searching "${value}"`);
    }
  }

  suggestionRenderer(suggestion, searchTerm) {
    return (
      <span>
        <span>{searchTerm}</span>
        <strong>{suggestion.substr(searchTerm.length)}</strong>
      </span>
    );
  }

  render() {
    return (
      <div>
        <SearchBar
          autoFocus
          shouldRenderClearButton
          // shouldRenderSearchButton
          placeholder="select an SAT word"
          onChange={this.handleChange}
          onClear={this.handleClear}
          onSelection={this.handleSelection}
          onSearch={this.handleSearch}
          suggestions={this.state.suggestions}
          suggestionRenderer={this.suggestionRenderer}
          styles={styles}
        />
        <div>
          <div>Search history</div>
          <div onClick={() => this.deleteHistory()}>Clear search history</div>
          {this.state.history.map((item, index) => {
            return (
              <div>
                {item}{" "}
                <span onClick={() => this.deleteSelectedHistory(item)}>X</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
