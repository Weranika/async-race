import Component from '../../templates/components';
import './car.scss';
import path from './pathSvg';

class Car extends Component {
  private carTrack:HTMLElement;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.carTrack = document.createElement('div');
    this.carTrack.className = 'car-track';
  }

  renderCar = (id: string, color:string) => `
  <div class='road'>
    <div class='control-panel'>
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
  `

  render() {
    this.carTrack.innerHTML = this.renderCar('bmv', 'red');
    return this.carTrack;
  }
}

export default Car;
