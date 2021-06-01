import React from "react";
import ReactDOM from "react-dom";
import autoBind from "react-autobind";
import axios from "axios";
import SearchBar from "./components/searchBar";
import styles from "./components/search.module.css";
import Button from "./components/deleteButton";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
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

  getInfo = () => {
    axios
      .get(
        `https://api.github.com/search/repositories?q=${this.state.query}&language=javascript`
      )
      .then((res) => {
        if (res.data.items != undefined) {
          let result = res.data.items.map((a) => a.name);
          this.setState({
            suggestions: result,
          });
        }
      });
  };

  handleChange(input) {
    this.setState(
      {
        query: input,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        } else if (!this.state.query) {
        }
      }
    );
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
        history: [
          ...this.state.history,
          { value, date: new Date().toLocaleString() },
        ],
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
        <strong>{suggestion.substr(searchTerm?.length)}</strong>
      </span>
    );
  }

  render() {
    return (
      <div>
        <SearchBar
          autoFocus
          shouldRenderClearButton
          shouldRenderSearchButton
          placeholder="search..."
          onChange={this.handleChange}
          onClear={this.handleClear}
          onSelection={this.handleSelection}
          onSearch={this.handleSearch}
          suggestions={this.state.suggestions}
          suggestionRenderer={this.suggestionRenderer}
          styles={styles}
        />
        <div>
          <div className={styles.historyTitle}>
            <div className={styles.searchTitle}>Search history</div>
            <div
              className={styles.clearTitle}
              onClick={() => this.deleteHistory()}
            >
              Clear search history
            </div>
          </div>
          <ul className={styles.historyItems}>
            {this.state.history.map((item, index) => {
              return (
                <li key={index}>
                  <div className={styles.title}>{item.value}</div>
                  <div className={styles.dateWrapper}>
                    <span className={styles.date}>{item.date}</span>
                    <span onClick={() => this.deleteSelectedHistory(item)}>
                      ✖
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.buttonWrapper}>
          <p>designed button for test</p>
          <Button />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
