export default class MaterialIcon {
  constructor(htmlElement) {
    this.container = htmlElement;
    this.findHTMLElements();
  }

  findHTMLElements() {
    this.icon = this.container.querySelector('.js-material-icon');
  }

  setTextContent(text) {
    this.icon.textContent = text;
  }
}
