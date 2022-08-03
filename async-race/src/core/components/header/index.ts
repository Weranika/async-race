import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';
import './header.scss';

const Buttons = [
  {
    id: PageIds.GaragePage,
    text: 'Garage',
  },
  {
    id: PageIds.WinnersPage,
    text: 'Winners',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      const pageButtonCont = document.createElement('div');
      pageButtonCont.className = `${button.id}-but`;
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtonCont.append(buttonHTML);
      pageButtons.append(pageButtonCont);
    });
    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}

export default Header;
