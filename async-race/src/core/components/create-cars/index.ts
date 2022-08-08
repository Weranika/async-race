import Component from '../../templates/components';
import './create.scss';
import { createCarHandler } from '../../../pages/app/hendlers';

class CreateCars extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  CreateCarInput () {
    const inputCreateCar = document.createElement('input');
    inputCreateCar.id = 'input-create-cars';
    inputCreateCar.className = 'input-create';
    inputCreateCar.type = 'text';
    this.container.append(inputCreateCar);
  }

  CreateCarColor () {
    const inputColor = document.createElement('input');
    inputColor.id = 'input-color';
    inputColor.type = 'color';
    inputColor.value='#F07574';
    this.container.append(inputColor);
  }

  CreateCarButton () {
    const buttonCreateCar = document.createElement('button');
    buttonCreateCar.id = 'button-create-car';
    buttonCreateCar.innerText = 'CREATE';

    buttonCreateCar.addEventListener("click", createCarHandler);
    this.container.append(buttonCreateCar);
  }

  render() {
    this.CreateCarInput ();
    this.CreateCarColor();
    this.CreateCarButton();
    return this.container;
  }
}

export default CreateCars;