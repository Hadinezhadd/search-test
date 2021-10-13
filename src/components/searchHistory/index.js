import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.scss";

const SearchHistory = (props) => {
  console.log(styles);
  return (
    <section>
      <div className={styles.historyTitle}>
        <h1 className={styles.searchTitle}>Search history</h1>
        <button
          className={styles.clearTitle}
          onClick={() => props.deleteHistory()}
          type="reset"
        >
          Clear search history
        </button>
      </div>
      <ul className={styles.historyItems}>
        {props.history.map((item, index) => {
          return (
            <li key={index}>
              <h2 className={styles.title}>{item.value}</h2>
              <div className={styles.dateWrapper}>
                <time dateTime={item.date} className={styles.date}>
                  {item.date}
                </time>
                <button
                  type="reset"
                  onClick={() => props.deleteSelectedHistory(item)}
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
  );
};

SearchHistory.propTypes = {
  deleteHistory: PropTypes.func.isRequired,
  deleteSelectedHistory: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
};

export default SearchHistory;
