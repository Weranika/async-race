import Component from '../../templates/components';
import Car from '../car';
import './garage-list.scss';

class GarageList extends Component {
  private carContainer:HTMLElement;
  private car: Car;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.carContainer = document.createElement('div');
    this.carContainer.className = 'car-container';
    this.car = new Car('div', 'car');
  }

  carInfo () {
    const carInfoContainer  = document.createElement('div');
    carInfoContainer.className = 'car-info-container';

    const selectButton = document.createElement('button');
    selectButton.id = 'select-button';
    selectButton.innerText = 'SELECT';
    selectButton.className = 'select-button';

    const removeButton = document.createElement('button');
    removeButton.id = 'remove-button';
    removeButton.innerText = 'REMOVE';
    removeButton.className = 'remove-button';

    const carBrand  = document.createElement('div');
    carBrand.id = 'car-brand';
    carBrand.innerText = 'Peugeot';
    carBrand.className = 'car-brand';

    carInfoContainer.append(selectButton);
    carInfoContainer.append(removeButton);
    carInfoContainer.append(carBrand);
    this.carContainer.append(carInfoContainer);
  }

  render() {
    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';

    const title = document.createElement('h1');
    title.innerText = 'Cars in garage:'
    titleContainer.append(title);

    const items = document.createElement('span');
    items.innerText = '7';
    titleContainer.append(items);

    const pageNumberContainer = document.createElement('div');
    pageNumberContainer.className = 'page-number-container';

    const pageNumberTitle = document.createElement('h2');
    pageNumberTitle.innerText = 'Page  #';
    pageNumberContainer.append(pageNumberTitle);

    const pageNumber = document.createElement('span');
    pageNumber.innerText = '1';
    pageNumberContainer.append(pageNumber);
    
    this.container.append(titleContainer);
    this.container.append(pageNumberContainer);
    this.container.append(this.carContainer);

    this.carInfo();
    this.carContainer.append(this.car.render());
    return this.container;
  }
}

export default GarageList;
