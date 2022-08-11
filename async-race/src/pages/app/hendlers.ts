import { createCar } from "./api";
import CarList from "../../core/components/car-list";
import { deleteCar, getCar, updateCar, GetCars, startStopEngine, switchCarEngine } from "../app/api";
import Garage from "../garage";
import { createRandomName, createRandomColor, speed } from './utils';
import { PageIds} from './index';
import { calcPageNumber } from './utils';

localStorage.setItem('page', '1');
localStorage.setItem('pageWinners', '1');
let currPage = localStorage.getItem('page') as string;

async function recreateCars() {
  const cars = await Garage.getCars(1);
  const carsList = new CarList('main', 'garage-list', cars.data, cars.carsCount as string);
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
  const selectedCar = document.getElementById(selectedCarId);
  
  const inputColor = document.getElementById('input-color-update') as HTMLInputElement;
  const newColor = inputColor.value;

  const inputName = document.getElementById('input-update-name') as HTMLInputElement;
  const newName = inputName.value;

  const updatedCar = await updateCar(newName, newColor, selectedCarId);
  window.dispatchEvent(new HashChangeEvent("hashchange"))
}

export async function generateRandomCars() {
  alert('please, wait')
  for (let i = 0; i < 100; i++) {
    const created100Cars = await createCar(createRandomName(), createRandomColor());    
  }
  window.location.reload();
  console.log('Cars were added');
}

export async function recetCarHandler() {
  const cars = document.getElementsByClassName('car');
    const carByClass = Array.prototype.map.call(cars, function(div){
      div.style.transform = `translateX(${0}px)`;
      div.style.transition = `all 0.3s ease-in`;
  });
}

export async function carTrackHandler(event:MouseEvent) {
  const id = (event.target as Element).id;
  if (id.startsWith('remove')) {
    const carId = id.substring('remove-button-'.length);
    const response = await deleteCar(carId);
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  } else if (id.startsWith('select')) {
    const carId = id.substring('select-button-'.length);
    const selectedCar = await getCar(carId);
    document.getElementById(id)?.setAttribute('selected', 'selected');
    const inputName = document.getElementById('input-update-name') as HTMLInputElement;
    inputName.value = `${selectedCar.data.name}`;
  } else if (id.startsWith('start-button')) {
    const carId = id.substring('start-button-'.length);
    const response = await startStopEngine(carId, 'started');
    console.log(response);

    const car = document.getElementById(`car-${carId}`) as HTMLElement;
    const distanse = (document.querySelector('.road') as HTMLElement).offsetWidth - 230;
    const speed = (response.data.distance / response.data.velocity) / 1000;
    const passed = Math.round( distanse / response.data.velocity);
    
    if (response) {
      const status = await switchCarEngine(carId, 'drive');
      if (status?.status === 'stopped') {
        console.log(carId, 'st')
        car.style.transform = `translateX(${0}px)`;
      } else if(status?.data === 'OK') {
        console.log(carId, 'ok')
        car.style.transform = `translateX(${distanse}px)`;
        car.style.transition = `all ${speed}s ease-in-out`;
      }
      
    //   car.style.transform = `translateX(${distanse}px)`;
    // car.style.transition = `all ${speed}s ease-in-out`;
    }

    car.style.transform = `translateX(${distanse}px)`;
    car.style.transition = `all ${speed}s ease-in-out`;
    
  } else if (id.startsWith('stop-button')) {
    const carId = id.substring('stop-button-'.length);
    const response = await startStopEngine(carId, 'stopped');

    const car = document.getElementById(`car-${carId}`) as HTMLElement;
    car.style.transform = `translateX(${0}px)`;
    car.style.transition = `all 0.5s ease-in`;
  }
}

export async function prevHandler() {
  const pages = await calcPageNumber();
  const butt = (document.getElementById('prev-butt') as HTMLButtonElement);
  if (+currPage < pages && +currPage > 1) {
    currPage = (+currPage - 1).toString();
    localStorage.setItem('page', `${+currPage}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}
export async function nextHandler() {
  const pages = await calcPageNumber();
  if (+currPage < pages && +currPage >= 1) {
    currPage = (+currPage + 1).toString();
    localStorage.setItem('page', `${+currPage}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

