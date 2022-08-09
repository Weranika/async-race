import Page from "../../core/templates/page";
import CreateCars from "../../core/components/create-cars";
import UpdateCars from "../../core/components/update-cars";
import Race from "../../core/components/race";
import CarList from "../../core/components/car-list";
import { GetCars } from "../app/api";
import Pagination from '../../core/components/pagination/index';
class Garage extends Page{
  private createCars: CreateCars;
  private updateCars: UpdateCars;
  private race: Race;
  private pagination: Pagination;

  constructor(id: string) {
    super(id);
    this.createCars = new CreateCars('div', 'create-car-container');
    this.updateCars = new UpdateCars('div', 'update-car-container');
    this.race = new Race('div', 'buttons-race-container');
    this.pagination = new Pagination('div', 'pagination-container');
  }

  static async getCars (page: number) {
    const cars = await GetCars(page);
    console.log('cars_00', cars);
    return cars;
  }

  async render(): Promise<HTMLElement>{
    this.container.append(this.createCars.render());
    this.container.append(this.updateCars.render());
    this.container.append(this.race.render());
    const cars = await Garage.getCars(1);
    const carsList = new CarList('main', 'garage-list', cars.data);
    this.container.append(await carsList.carInfo());
    this.container.append(await carsList.renderCars());
    this.container.append(this.pagination.render());
    
    return this.container;
  }
}

export default Garage;
