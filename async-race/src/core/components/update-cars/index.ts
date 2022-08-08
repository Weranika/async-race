import Component from '../../templates/components';
import '../create-cars/create.scss';
import { updateCarHandler } from '../../../pages/app/hendlers';

class UpdateCars extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  UpdateCarInput () {
    const inputUpdateCar = document.createElement('input');
    inputUpdateCar.id = 'input-update-cars';
    inputUpdateCar.className = 'input-update';
    inputUpdateCar.type = 'text';
    this.container.append(inputUpdateCar);
  }

  UpdateCarColor () {
    const inputUpdateColor = document.createElement('input');
    inputUpdateColor.id = 'input-color';
    inputUpdateColor.type = 'color';
    inputUpdateColor.value='#712056';
    this.container.append(inputUpdateColor);
  }

  UpdateCarButton () {
    const buttonUpdateCar = document.createElement('button');
    buttonUpdateCar.id = 'button-update-car';
    buttonUpdateCar.innerText = 'UPDATE';
    buttonUpdateCar.addEventListener("click", updateCarHandler);
    this.container.append(buttonUpdateCar);
  }

  render() {
    this.UpdateCarInput ();
    this.UpdateCarColor();
    this.UpdateCarButton();
    return this.container;
  }
}

export default UpdateCars;