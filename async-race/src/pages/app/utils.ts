import { GetCars, getWinners } from './api';

const limitOnPage = 7;
const limitOnWinPage = 10;
const currPageWin = localStorage.getItem('pageWinners') as string; 

const models = ['Peugeot', 'BMW', 'Opel', 'Audi', 'Ford', 'Renault', 'Porshe', 'Lamborgini', 'KIA', 'Mercedes'];
const typeCar = ['Coupe', 'Sedan', 'Combi', 'SUV', '5', '6', 'mini', 'Seria 3', 'Seria 4', '307'];

export const createRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const type = typeCar[Math.floor(Math.random() * typeCar.length)];

  return `${model} ${type}`;
}

export const createRandomColor = () => {
  const numbers = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return `#${color}`;
}
export async function calcPageNumber () {
  const cars = await GetCars(1);
  const carsCount = cars.carsCount as string;
  return +carsCount / limitOnPage;
}
export async function calcWinPageNumber () {
  const cars = await getWinners(+currPageWin, 'id', 'ASC');
  const carsWinsCount = cars.carsCount as string;
  console.log('test', +currPageWin, carsWinsCount)
  return Math.round(+carsWinsCount / limitOnPage);
}
