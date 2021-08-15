import Component from "./Component.js";

export default class Results extends Component {
  editBtnClass = "results-edit";
  deleteBtnClass = "results-delete";
  onEditClick = () => {};
  isSearchAvailable = true;

  constructor(selector, items = []) {
    super(selector);
    this._items = items;
    this._searchResults = items;
    this.render(); // довольно опасно вызывать методы в конструкторе, но если вы уверены в своем коде, то можно
    this.$element.addEventListener("click", (e) => {
      const $selectedItemElement = e.target.closest("li"); // получаем <li> в котором произошел click
      const itemIndex = Number($selectedItemElement.dataset.index); // получаем индекс элемента

      if (e.target.classList.contains(this.deleteBtnClass)) {
        // ловим нажатие на кнопку удаления
        this.deleteItem(itemIndex);
      } else if (e.target.classList.contains(this.editBtnClass)) {
        // ловим нажатие на кнопку редактирования
        this.isSearchAvailable = false;
        const text = $selectedItemElement.querySelector("div").innerText; // получаем текст
        this.onEditClick(text, itemIndex);
      }
    });
  }

  searchItems(text) {
    if (this.isSearchAvailable) {
      this._searchResults = this._items.filter((item) =>
        item.toLowerCase().includes(text)
      );
    }
    this.render();
  }

  get items() {
    return this._items;
  }

  addItem(item) {
    this._items.push(item);
    this._searchResults = this._items;
    this.render();
  }

  deleteItem(itemIndex) {
    this._items = this.items.filter((item, index) => index !== itemIndex);
    this._searchResults = this._items;
    this.render();
  }

  updateItem(text, index) {
    this._items[index] = text;
    this._searchResults = this._items;
    this.isSearchAvailable = true;
    this.render();
  }

  render() {
    this.$element.innerHTML = this._searchResults.reduce(
      (result, item, index) => {
        const newElemennt = `<li data-index="${index}">
          <div>${item}</div>
          <span>
            <button class="${this.editBtnClass}">&#9998;</button>
            <button class="${this.deleteBtnClass}">&#10006;</button>
          </span>
        </li>`;
        result += newElemennt;
        return result;
      },
      ""
    );
  }
}
