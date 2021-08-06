const items = [
  "Молоко",
  "Орехи",
  "Кофе",
  "Сахар",
  "Хлеб",
  "Йогурт",
  "Сок",
  "Бананы",
  "Мандарины",
  "Шоколад",
  "Печенье",
];

class Search {
  _value = "";
  constructor(selector, onInput) {
    this.$element = document.querySelector(selector);
    this.$element.addEventListener("input", ({ target }) => {
      this._value = target.value;
      onInput(this._value.toLowerCase());
    });
  }
}

class Results {
  constructor(selector, items = []) {
    this.$element = document.querySelector(selector);
    this._items = items;
    this._searchResults = items;
    this.render(); // довольно опасно вызывать методы в конструкторе, но если вы уверены в своем коде, то можно
  }

  searchItems(text) {
    this._searchResults = this._items.filter((item) =>
      item.toLowerCase().includes(text)
    );
    this.render();
  }

  render() {
    this.$element.innerHTML = this._searchResults.reduce(
      (result, item) => (result += `<li>${item}</li>`),
      ""
    );
  }
}

const results = new Results("#results", items);

const search = new Search("#search", (text) => {
  results.searchItems(text);
});
