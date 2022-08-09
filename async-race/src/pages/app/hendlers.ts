import { createCar } from "./api";
import CarList from "../../core/components/car-list";
import { deleteCar, getCar, updateCar } from "../app/api";
import Garage from "../garage";
import { createRandomName, createRandomColor } from './utils';
import { PageIds} from './index';

async function recreateCars() {
  const cars = await Garage.getCars(1);
  const carsList = new CarList('main', 'garage-list', await cars.data);
  return carsList;
}

export async function createCarHandler() {
  const inputValue = (document.getElementById('input-create-cars') as HTMLInputElement).value;
  const inputColor = (document.getElementById('input-color') as HTMLInputElement).value;
  console.log(inputValue);
  const createCarResp = await createCar(inputValue, inputColor);
  window.dispatchEvent(new HashChangeEvent("hashchange"))
}

export async function updateCarHandler() {
  
  const selected = document.querySelector('[selected="selected"]');
  const selectedCarId = selected?.id.substring('select-button-'.length) as string;
  
  const inputColor = document.getElementById('input-color-update') as HTMLInputElement;
  const newColor = inputColor.value;

  const inputName = document.getElementById('input-update-name') as HTMLInputElement;
  const newName = inputName.value;

  const updatedCar = await updateCar(newName, newColor, selectedCarId);
  window.dispatchEvent(new HashChangeEvent("hashchange"))
}

export async function generateRandomCars() {
  for (let i = 0; i < 100; i++) {
    const created100Cars = await createCar(createRandomName(), createRandomColor());
  }
  console.log('Cars were added');
}

export async function carTrackHandler(event:MouseEvent) {
  const id = (event.target as Element).id;
  const carId = id.substring('remove-button-'.length);

  if (id.startsWith('remove')) {
    const response = await deleteCar(carId);
    console.log("dispatch hashchange")
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  } else if (id.startsWith('select')) {
    const selectedCar = await getCar(carId);
    //console.log(selectedCar.data);
    document.getElementById(id)?.setAttribute('selected', 'selected');
  }

}