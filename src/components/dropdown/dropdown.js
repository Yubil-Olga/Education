import DropdownOption from '../dropdown-option/dropdown-option';

export default class Dropdown {
  constructor(htmlElement, optionCases) {
    this.dropdown = htmlElement;
    this.titleCases = optionCases;
    this.dropdownActiveClassName = 'dropdown_active';
    this.findHTMLElements();
    this.setOptions();
    this.bindEventListeners();
  }

  findHTMLElements() {
    this.toggle = this.dropdown.querySelector('.js-dropdown__selection');
    this.question = this.dropdown.querySelector('.js-dropdown__title').textContent;
    this.title = this.dropdown.querySelector('.js-dropdown__title');
    this.menu = this.dropdown.querySelector('.js-dropdown__menu');
    this.options = this.dropdown.querySelectorAll('.js-dropdown__option');
    this.values = Array.from(this.options).map((el) => new DropdownOption(el));
    this.acceptButton = this.dropdown.querySelector('.js-dropdown__accept-button') || null;
    this.cleanButton = this.dropdown.querySelector('.js-dropdown__clean-button') || null;
  }

  setOptions() {
    this.selected = [];
    this.values.forEach((el) => {
      const group = {
        name: el.option.getAttribute('data-group'),
        value: el.value,
      };
      group.collection = this.titleCases[group.name] ? this.titleCases[group.name] : null;

      const index = this.selected.findIndex((elem) => elem.name === group.name);
      if (index >= 0) {
        this.selected[index].value += el.value;
      } else {
        this.selected.push(group);
      }
    });

    this.updateTitle();
  }

  bindEventListeners() {
    this.handleSelectionClick = this.handleSelectionClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleAcceptButtonClick = this.handleAcceptButtonClick.bind(this);
    this.handleCleanButtonClick = this.handleCleanButtonClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggle.addEventListener('click', this.handleSelectionClick);
    this.options.forEach((el) => el.addEventListener('click', this.handleOptionClick));
    if (this.acceptButton) this.acceptButton.addEventListener('click', this.handleAcceptButtonClick);
    if (this.cleanButton) this.cleanButton.addEventListener('click', this.handleCleanButtonClick);
    document.addEventListener('click', this.handleDocumentClick);
  }

  handleSelectionClick() {
    this.toggle.classList.toggle('dropdown__selection_active');
    this.menu.classList.toggle('dropdown__menu_active');
  }

  handleDocumentClick(event) {
    if (event.target.closest('.js-dropdown') !== this.dropdown) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    const isDropdownClosed = this.toggle.classList.contains('dropdown__selection_active')
      && this.menu.classList.contains('dropdown__menu_active');
    if (isDropdownClosed) {
      this.toggle.classList.remove('dropdown__selection_active');
      this.menu.classList.remove('dropdown__menu_active');
    }
  }

  handleAcceptButtonClick(event) {
    event.preventDefault();
    this.closeDropdown();
  }

  handleCleanButtonClick(event) {
    event.preventDefault();
    this.values.forEach((el) => {
      el.input.value = 0;
      el.value = 0;
      el.checkValue();
    });
    this.cleanButtonVisibility();
    this.title.textContent = this.question;
  }

  handleOptionClick() {
    if (this.cleanButton) {
      this.cleanButtonVisibility();
    }
    this.setOptions();
  }

  cleanButtonVisibility() {
    const selection = this.values.filter((option) => option.value > 0);
    const visibilityStyle = 'dropdown__clean-button_visible';
    const isCleanButtonVisible = (selection.length > 0)
      && (!this.cleanButton.classList.contains(visibilityStyle));
    const isCleanButtonHidden = (selection.length < 1)
      && (this.cleanButton.classList.contains(visibilityStyle));
    if (isCleanButtonVisible) {
      this.cleanButton.classList.add(visibilityStyle);
    }
    if (isCleanButtonHidden) {
      this.cleanButton.classList.remove(visibilityStyle);
    }
  }

  updateTitle() {
    const selected = this.selected.filter((el) => el.value > 0);
    if (selected.length > 0) {
      selected.forEach((el) => {
        if (el.collection) {
          let index = 0;
          const value = el.value > 20 ? el.value % 10 : el.value;
          switch (value) {
            case 1:
              index = 0;
              break;
            case 2:
            case 3:
            case 4:
              index = 1;
              break;
            default:
              index = 2;
          }
          el.word = el.collection[index];
        } else {
          el.word = el.name;
        }
      });

      this.title.textContent = selected.map((el) => `${el.value} ${el.word}`).join(', ');
    } else {
      this.title.textContent = this.question;
    }
  }
}
