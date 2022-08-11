import { createCar } from "./api";
import CarList, { ICar } from "../../core/components/car-list";
import { deleteCar, getCar, updateCar, createWinners, startStopEngine, switchCarEngine, getWinners, getWinner } from "../app/api";
import Garage from "../garage";
import { createRandomName, createRandomColor, calcWinPageNumber } from './utils';
import { calcPageNumber } from './utils';
import WinnersPage from '../../pages/winners/index';

interface IWin {
  id: string,
  wins: number,
  time: number
}
localStorage.setItem('page', '1');
localStorage.setItem('pageWinners', '1');
localStorage.setItem('sort', 'id');
localStorage.setItem('order', 'ASC');

const sort = localStorage.getItem('sort') as string;
const order = localStorage.getItem('order') as string;

let currPage = localStorage.getItem('page') as string;
let currPageWin = localStorage.getItem('pageWinners') as string;

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

export async function raceAllHandler() {
  const carsOnPageResp = await Garage.getCars(+currPage);
  const cars = await carsOnPageResp.data;
  console.log(cars, 'cars on page');
  let arrTime:Array<IWin> = [];

  const carByClass = cars.map(async(car:HTMLElement) => {
    const carId = car.id;
    const div = document.getElementById(`car-${carId}`) as HTMLElement;
    const response = await startStopEngine(carId, 'started');
    const distanse = (document.querySelector('.road') as HTMLElement).offsetWidth - 230;
    const speed = +((response.data.distance / response.data.velocity) / 1000).toFixed(2);
    const passed = Math.round( distanse / speed);
    
    if (response) {
      const status = await switchCarEngine(carId, 'drive');
      if (status?.status === 'stopped') {
        console.log(carId, '500');
        div.style.transform = `translateX(${passed}px)`;
        div.style.transition = `all ${speed}s ease-in-out`;
      } else {
        console.log(carId, 'ok')
        div.style.transform = `translateX(${distanse}px)`;
        div.style.transition = `all ${speed}s ease-in-out`;
        try{
          const winner = await getWinner(carId);          
          const winnerData = winner.data;          
          arrTime.push(winnerData);       
        }
        catch (e){
          const createWinn = await createWinners(carId, speed.toString());
        } 
      }
    }
  });
  const res = await Promise.all(carByClass);
  const firstTime = arrTime.sort((a, b) => a.time -  b.time); 
  const selectedCar = await getCar(firstTime[0].id);
  const selectedCarInf = selectedCar.data;

  alert(`Wins ${selectedCarInf.name}, time: ${firstTime[0].time}`);
  arrTime = [];
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
    console.log(carId)
    const response = await startStopEngine(carId, 'started');

    const car = document.getElementById(`car-${carId}`) as HTMLElement;
    const distanse = (document.querySelector('.road') as HTMLElement).offsetWidth - 230;
    const speed = (response.data.distance / response.data.velocity) / 1000;
    const passed = Math.round( distanse / speed);
        
    const stopBtn = document.getElementById(`stop-button-${carId}`) as HTMLButtonElement;
    console.log(stopBtn)
    stopBtn.disabled = true;

    if (response) {
      const status = await switchCarEngine(carId, 'drive');
      stopBtn.disabled = false;
      if (status?.status === 'stopped') {
        console.log(carId, '500')
        car.style.transform = `translateX(${passed}px)`;
      } else {
        console.log(carId, 'ok')
        car.style.transform = `translateX(${distanse}px)`;
        car.style.transition = `all ${speed}s ease-in-out`;
      }
    }
  } else if (id.startsWith('stop-button')) {
    const carId = id.substring('stop-button-'.length);

    const startBtn = document.getElementById(`start-button-${carId}`) as HTMLButtonElement;
    startBtn.disabled = true;

    const response = await startStopEngine(carId, 'stopped');
    const car = document.getElementById(`car-${carId}`) as HTMLElement;
    car.style.transform = `translateX(${0}px)`;
    car.style.transition = `all 0.5s ease-in`;
    startBtn.disabled = false;
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
  const buttPrev = (document.getElementById('prev-butt') as HTMLButtonElement);
  buttPrev.disabled = false;
  if (+currPage < pages && +currPage >= 1) {
    buttPrev.disabled = false;
    currPage = (+currPage + 1).toString();
    localStorage.setItem('page', `${+currPage}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}
export async function prevHandlerWin() {
  const pages = await calcWinPageNumber();
  console.log(pages, +currPageWin)
  if (+currPageWin <= pages && +currPageWin > 1) {
    currPageWin = (+currPageWin - 1).toString();
    localStorage.setItem('pageWinners', `${+currPageWin}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}
export async function nextHandlerWin() {
  const pages = await calcWinPageNumber();
  if (+currPageWin < pages && +currPageWin >= 1) {
    currPageWin = (+currPageWin + 1).toString();
    localStorage.setItem('pageWinners', `${+currPageWin}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export async function timeSort() {
  //console.log('toggle')
  const time = document.getElementById('time') as HTMLElement;
  console.log(time)
  if (time?.hasAttribute('toggle')) {
    localStorage.setItem('sort', 'time');
    time.removeAttribute('toggle');
    console.log('toggle')
  } else {
    localStorage.setItem('order', 'DESC');
    time?.setAttribute('toggle', 'toggle');
    console.log('no toggle')
  }  
  window.dispatchEvent(new HashChangeEvent("hashchange"))
}

export async function winsSort() {
  const wins = document.getElementById('wins');
  if(wins?.hasAttribute('toggle')) {
    const cars = await getWinners(+currPageWin, 'wins', 'ASC', 10);
    wins.removeAttribute('toggle');
  } else {
    const cars = await getWinners(+currPageWin, 'wins', 'DESC', 10);
    
    wins?.setAttribute('toggle', 'toggle');
  }  
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

