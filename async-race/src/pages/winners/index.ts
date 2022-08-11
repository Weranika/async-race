import Page from "../../core/templates/page";
import WinnersComponent from "../../core/components/winners";
import { getWinners } from "../app/api";
import { getCar } from "../app/api";
import Pagination from "../../core/components/pagination/indexWin";

const sort = localStorage.getItem('sort') as string;
const order = localStorage.getItem('order') as string;

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
  private pagination: Pagination;
  constructor(id: string) {
    super(id);
    this.pagination = new Pagination('div', 'pagination-container');
  }

  // static async renderWin(sort:string, order:string) {
  //   const cars = await getWinners(+currPage, sort, order);
  //   const carList = cars.data.map(async (car:ICarForWinners) => {
  //     const selectedCar = await getCar(car.id);
  //     return {
  //       id: car.id,
  //       time: car.time,
  //       wins: car.wins,
  //       name: selectedCar.data.name,
  //       color: selectedCar.data.color
  //     }
  //   })
  //   const res = await Promise.all(carList);
  //   const winnersComp = new WinnersComponent('div', 'winners', res, cars.carsCount as string);
    
  // }

  async render() {
    const currPageWin = localStorage.getItem('pageWinners') as string;
    const cars = await getWinners(+currPageWin, sort, order, 10);
    console.log(+currPageWin, 'new stor')

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
    this.container.append(this.pagination.render());
    return this.container;
  }
}

export default WinnersPage;
