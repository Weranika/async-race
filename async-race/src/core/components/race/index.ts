import Component from '../../templates/components';
import './race.scss';
import { generateRandomCars, recetCarHandler, raceAllHandler } from '../../../pages/app/hendlers';

class Race extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  RaceButton () {
    const buttonRace = document.createElement('button');
    buttonRace.id = 'button-race';
    buttonRace.innerText = 'RACE';
    buttonRace.className = 'button-race';
    buttonRace.addEventListener("click", raceAllHandler);
    this.container.append(buttonRace);
  }
  ResetButton () {
    const buttonReset = document.createElement('button');
    buttonReset.id = 'button-reset';
    buttonReset.innerText = 'RESET';
    buttonReset.className = 'button-reset';
    buttonReset.addEventListener("click", recetCarHandler);
    this.container.append(buttonReset);
  }
  GenerateButton () {
    const buttonGenerate = document.createElement('button');
    buttonGenerate.id = 'button-generate';
    buttonGenerate.innerText = 'GENERATE CARS';
    buttonGenerate.className = 'button-generate';
    buttonGenerate.addEventListener("click", generateRandomCars);
    this.container.append(buttonGenerate);
  }

  render() {
    this.RaceButton ();
    this.ResetButton();
    this.GenerateButton();
    return this.container;
  }
}

export default Race;