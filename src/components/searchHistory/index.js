import PropTypes from "prop-types";
import React from "react";
import Button from "../DeleteButton";
import styles from "./styles.module.scss";

const SearchHistory = (props) => {
  return (
    <section>
      <div className={styles.historyTitle}>
        <h2 className={styles.searchTitle}>Search history</h2>
        <Button
          className={styles.clearTitle}
          onClick={() => props.deleteHistory()}
          type="reset"
          title="Clear search history"
        />
      </div>
      <ul className={styles.historyItems}>
        {props.history.map((item, index) => {
          return (
            <li key={index}>
              <h3 className={styles.title}>{item.value}</h3>
              <div className={styles.dateWrapper}>
                <time dateTime={item.date} className={styles.date}>
                  {item.date}
                </time>
                <button
                  type="reset"
                  aria-label="Delete Item"
                  onClick={() => props.deleteSelectedHistory(item)}
                  className={styles.itemClearButton}
                >
                  ✖
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
