import Component from '../../templates/components';
import './car.scss';
import path from './pathSvg';
import { ICar } from '../car-list';
import { carTrackHandler } from '../../../pages/app/hendlers';

class Car extends Component {
  private carTrack:HTMLElement;
  private car:ICar;

  constructor(car:ICar, tagName: string, className: string) {
    super(tagName, className);
    this.carTrack = document.createElement('div');
    this.carTrack.className = 'car-track';
    this.car = car;
  }
  get carInst() {
    return this.car;
  }

  renderCar = (id: string, name:string, color:string) => `
  <div class='car-info-container'>
    <button class='select-button' id='select-button-${id}'>SELECT</button>
    <button class='remove-button' id='remove-button-${id}'>REMOVE</button>
    <div id=${id} className='car-model'>${name}</div>
  </div>
  <div class='road'>
  <div class='control-panel'>
    <div>
      <button class='control-button start-button' id='start-button-${id}'>A</button>
      <button class='control-button stop-button' id='stop-button-${id}'>B</button>
    </div>
    <div class="car" id="car-${id}">
      <svg viewBox="0 0 200.000000 100.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,90.000000) scale(0.0100000,-0.0100000)" fill="${color}" stroke="none">
          ${path}
        </g>
      Sorry, your browser does not support inline SVG.
      </svg>
    </div>
  </div>
    <div class='flag id='flag-${id}>&#127937;</div>
  </div>
  
  `

  render() {
    this.carTrack.innerHTML = this.renderCar(this.car.id, this.car.name, this.car.color);
    this.carTrack?.addEventListener("click", carTrackHandler);
    return this.carTrack;
  }
}

export default Car;
