import axios from "axios";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import endpoints from "../../constants/endpoints";

//clear suggestions list
export const handleClear = ({ setSuggestions }) => {
  setSuggestions([]);
};

//get data from the api and set suggestions list
export const getInfo = ({ input, setSuggestions }) => {
  const url = endpoints.SEARCH.GET_SEARCH_SERVICE(input);
  axios
    .get(url)
    .then((res) => {
      if (res.data.items !== undefined) {
        let result = res.data.items.map((a) => a.name);
        setSuggestions(result);
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1000,
      });
    });
};

//handle changes on input and send request for search
export const debounceHandleChange = debounce(
  ({ input, setSuggestions }) => getInfo({ input, setSuggestions }),
  800
);

//delete given item from history list
export const deleteSelectedHistory = ({ item, history, setHistory }) => {
  setHistory(history.filter((e) => e !== item));
};

//delete all items from history
export const deleteHistory = ({ setHistory }) => {
  setHistory([]);
};

//add a selected item to history
export const handleSelection = ({ value, history, setHistory }) => {
  if (value) {
    setHistory([...history, { value, date: new Date().toLocaleString() }]);
  }
};
