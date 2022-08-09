import Component from '../../templates/components';
import Car from '../car';
import './garage-list.scss';
import { GetCars } from '../../../pages/app/api';
export interface ICar {
  name: string,
  color: string,
  id: string
}
interface IGetCars {
  data: Array<ICar>,
  carsCount: string | null,
}

class CarList extends Component {
  private carList: Array<ICar>;
  

  constructor(tagName: string, className: string, carList: Array<ICar>) {
    super(tagName, className);
    this.carList = carList;
  }

  async carInfo () {
    const cars = await GetCars(1);

    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';

    const title = document.createElement('h1');
    title.innerText = 'Cars in garage:'
    titleContainer.append(title);

    const items = document.createElement('span');
    items.innerText = cars.carsCount as string;
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

    return this.container;
  }

  async renderCars() {
    const ul = document.createElement('ul')
    ul.classList.add('car-container');

    this.carList.forEach((car) => {
      const carInst = new Car(car, 'div', 'car-track').render();

      console.log('CARINST:', carInst)
      const li = document.createElement('li');
      li.appendChild(carInst);
      ul.appendChild(li);
    })
    return ul;
  }
}

export default CarList;
