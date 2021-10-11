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
        if (res.data.items !== undefined) {
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
        this.getInfo();
      }
    );
  }

  deleteSelectedHistory(item) {
    this.setState((prevState) => ({
      history: prevState.history.filter((e) => e !== item),
    }));
  }

  deleteHistory() {
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
      <main role="main">
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
          delay={500}
        />
        <section>
          <div className={styles.historyTitle}>
            <h1 className={styles.searchTitle}>Search history</h1>
            <button
              className={styles.clearTitle}
              onClick={() => this.deleteHistory()}
              type="reset"
            >
              Clear search history
            </button>
          </div>
          <ul className={styles.historyItems}>
            {this.state.history.map((item, index) => {
              return (
                <li key={index}>
                  <h2 className={styles.title}>{item.value}</h2>
                  <div className={styles.dateWrapper}>
                    <time datetime={item.date} className={styles.date}>
                      {item.date}
                    </time>
                    <button
                      type="reset"
                      onClick={() => this.deleteSelectedHistory(item)}
                      className={styles.itemClearButton}
                    >
                      ✖
                      <span className={styles.visuallyHidden}>
                        Clear Search item
                      </span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <div className={styles.buttonWrapper}>
          <p>designed button for test</p>
          <Button />
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
