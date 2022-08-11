import Page from "../../core/templates/page";
import WinnersComponent from "../../core/components/winners";
import { getWinners } from "../app/api";
import { getCar } from "../app/api";

const currPage = localStorage.getItem('pageWInners') as string;
export interface ICarForWinners {
  id: string,
  time: number, 
  wins: number,
  name: string,
  color: string,
}
interface ICar {
  name: string,
  color: string,
  id: string
}
class WinnersPage extends Page{
  
  constructor(id: string) {
    super(id);
  }

  async render() {
    const cars = await getWinners(+currPage, 'id', 'ASC', 10);
    
    const carList = cars.data.map(async (car:ICarForWinners) => {
      const selectedCar = await getCar(car.id);
      return {
        id: car.id,
        time: car.time,
        wins: car.wins,
        name: selectedCar.data.name,
        color: selectedCar.data.color
      }
    })
    const res = await Promise.all(carList);
    console.log(res, 'cars list')

    const winnersComp = new WinnersComponent('div', 'winners', res, cars.carsCount as string);
    this.container.append(await winnersComp.winHeader());
    this.container.append(await winnersComp.renderCars());
    return this.container;
  }
}

export default WinnersPage;
