import { createCar } from "./api";
import { app } from "../..";
import CarList from "../../core/components/car-list";
import { GetCars, deleteCar, getCar } from "../app/api";
import Garage from "../garage";

async function recreateCars() {
  const cars = await Garage.getCars(1);
  const carsList = new CarList('main', 'garage-list', await cars.data);
  return carsList;
}


export async function createCarHandler() {
  const inputValue = (document.getElementById('input-create-cars') as HTMLInputElement).value;
  const inputColor = (document.getElementById('input-color') as HTMLInputElement).value;
  
  const response = await createCar(inputValue, inputColor);
}

export async function updateCarHandler() {
  const selected = document.querySelector('[selected="selected"]');
  const selectedCarId = selected?.id.substring(+selected.id.length - 1) as string;
  console.log(selectedCarId);


  const selectedCar = await getCar(selectedCarId);
}

export async function carTrackHandler(event:MouseEvent) {
  const id = (event.target as Element).id;
  const carId = id.substring(+id.length - 1);

  //console.log('id', id.substring(+id.length - 1));

  if (id.startsWith('remove')) {
    const response = await deleteCar(carId);
  } else if (id.startsWith('select')) {
    const selectedCar = await getCar(carId);
    //console.log(selectedCar.data);
    document.getElementById(id)?.setAttribute('selected', 'selected');
  } else if (id.startsWith('')) {
    
  }
}