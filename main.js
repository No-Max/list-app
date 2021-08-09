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

class Component {
  constructor(selector) {
    this.$element = document.querySelector(selector);
  }
}

class Search extends Component {
  _value = "";
  constructor(selector, onInput) {
    super(selector);
    this.$element.addEventListener("input", ({ target }) => {
      this._value = target.value;
      onInput(this._value.toLowerCase());
    });
  }
}

class Results extends Component {
  constructor(selector, items = []) {
    super(selector);
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

class CreateButton extends Component {
  _disabled;
  _onClick = () => {};
  constructor(selector) {
    super(selector);
    this.disabled = true;
  }

  set onClick(handler) {
    this._onClick = handler;
    this.$element.addEventListener("click", this._onClick);
  }

  set disabled(isDisabled) {
    this._disabled = isDisabled;
    this.$element.disabled = isDisabled;
  }
}

const createButton = new CreateButton("#create");

const results = new Results("#results", items);

const search = new Search("#search", (text) => {
  results.searchItems(text);
});
