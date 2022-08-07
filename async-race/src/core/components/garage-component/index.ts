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
  private carList: Array<Car>;
  

  constructor(tagName: string, className: string, carList: Array<Car>) {
    super(tagName, className);
    this.carList = carList;
   // this.car = new Car('div', 'car', this.car.carInst);
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
  }

  async renderCars() {
    //const cars:IGetCars = await GetCars(1);
    
    return `
      <ul class='car-container'>
        ${this.carList.map((car) => `<li>${car.render()}</li>`)}
      </ul>`
  }

  render() {
    //const MyComponent = () => Promise.resolve(this.container.append(this.renderCars());
    const Component = this.renderCars().then((resolve) => console.log(resolve));
    this.container.append('this.renderCars()');
    return this.container;
    
  }
}

export default CarList;
