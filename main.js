import items from "./models/items.js";

import Button from "./components/Button.js";
import Results from "./components/Results.js";
import Search from "./components/Search.js";

const createButton = new Button("#create");
const updateButton = new Button("#update", false, true);

const results = new Results("#results", items);

const search = new Search("#search", (text) => {
  results.searchItems(text);
  if (results.items.includes(search.value) || text === "") {
    createButton.disabled = true;
  } else {
    createButton.disabled = false;
  }
});

createButton.onClick = () => {
  results.addItem(search.value);
  search.clear();
  createButton.disabled = true;
};

updateButton.onClick = () => {
  results.updateItem(search.value, updateButton.index);
  createButton.hidden = false;
  updateButton.hidden = true;
  search.clear();
  createButton.disabled = true;
};

results.onEditClick = (text, index) => {
  search.value = text;
  updateButton.index = index;
  createButton.hidden = true;
  updateButton.hidden = false;
};
