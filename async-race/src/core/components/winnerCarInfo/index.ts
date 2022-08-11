import Component from '../../templates/components';
import './car.scss';
import path from '../car/pathSvg';
import { ICarForWinners } from '../../../pages/winners/index';

class CarInWinners extends Component {
  private carWinnerLine:HTMLElement;
  private car:ICarForWinners;

  constructor(car:ICarForWinners, tagName: string, className: string) {
    super(tagName, className);
    this.carWinnerLine = document.createElement('div');
    this.carWinnerLine.className = 'car-winner-line';
    this.car = car;
  }

  renderWinner = (id: string, time:number, wins:number, name:string, color:string) => `
  <div class='car-win-id'>${id}</div>
  <div class="car-win" id="car-win-${id}">
    <svg viewBox="0 0 200.000000 100.000000" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,90.000000) scale(0.0100000,-0.0100000)" fill="${color}" stroke="none">
        ${path}
      </g>
    Sorry, your browser does not support inline SVG.
    </svg>
  </div>
  <div class='car-win-model'>${name}</div>
  <div class='car-win-time' id='car-win-time-${id}'>${time}</div>
  <div class='car-wins' id='car-wins-${id}'>${wins}</div>
  `;

  render() {
    this.carWinnerLine.innerHTML =  this.renderWinner(this.car.id, this.car.time, this.car.wins, this.car.name, this.car.color);
    console.log(this.car, 'all')
    return this.carWinnerLine;
  }
}

export default CarInWinners;
