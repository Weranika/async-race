import Component from '../../templates/components';
import './winners.scss';
import CarInWinners from '../winnerCarInfo';
import { ICarForWinners } from '../../../pages/winners/index';
import { timeSort, winsSort } from '../../../pages/app/hendlers';

class WinnersComponent extends Component {
  private carList: Array<ICarForWinners>;
  private carsCount: string;

  constructor(tagName: string, className: string, carList: Array<ICarForWinners>, carsCount: string) {
    super(tagName, className);
    this.carList = carList;
    this.carsCount = carsCount;
  }

  async winHeader () {
    const currPage = localStorage.getItem('pageWinners') ;

    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';

    const title = document.createElement('h1');
    title.innerText = 'Winners:'
    titleContainer.append(title);

    const items = document.createElement('span');
    items.innerText = this.carsCount;
    titleContainer.append(items);

    const pageNumberContainer = document.createElement('div');
    pageNumberContainer.className = 'page-number-container';

    const pageNumberTitle = document.createElement('h2');
    pageNumberTitle.innerText = 'Page  #';
    pageNumberContainer.append(pageNumberTitle);

    const pageNumber = document.createElement('span');
    pageNumber.innerText = currPage as string;
    console.log(currPage, 'currPage');

    pageNumberContainer.append(pageNumber);
    this.container.append(titleContainer);
    this.container.append(pageNumberContainer);

    return this.container;
  }

  async renderCars() {
    const ul = document.createElement('ul');
    ul.classList.add('winners-container');

    const winTitle = document.createElement('div');
    winTitle.classList.add('win-title');
    ul.append(winTitle);

    const carId = document.createElement('div');
    carId.innerText = '#';
    carId.classList.add('title-num');
    winTitle.append(carId);

    const car = document.createElement('div');
    car.innerText = 'CAR';
    car.classList.add('title-car');
    winTitle.append(car);

    const carName = document.createElement('div');
    carName.innerText = 'NAME';
    carName.id = 'name';
    car.classList.add('car-win-title');
    winTitle.append(carName);

    const time = document.createElement('button');
    time.innerText = 'TIME';
    time.id = 'time';
    time.classList.add('car-win-butt');
    time.addEventListener("click", timeSort);
    time.setAttribute('toggle', 'toggle');
    winTitle.append(time);

    const wins = document.createElement('button');
    wins.innerText = 'WINS';
    wins.classList.add('car-win-butt');
    wins.addEventListener("click", winsSort);
    wins.setAttribute('toggle', 'toggle');
    winTitle.append(wins);

    this.carList.forEach((car) => {
      const carWinInst = new CarInWinners(car, 'div', 'winners').render();
      const li = document.createElement('li');
      li.appendChild(carWinInst);
      ul.appendChild(li);
    })
    return ul;
  }
}

export default WinnersComponent;