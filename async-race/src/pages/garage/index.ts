import Page from "../../core/templates/page";
import CreateCars from "../../core/components/create-cars";
import UpdateCars from "../../core/components/update-cars";
import Race from "../../core/components/race";
import CarList from "../../core/components/garage-component";
import { GetCars } from "../app/api";
class Garage extends Page{
  private createCars: CreateCars;
  private updateCars: UpdateCars;
  private race: Race;
  //private garageList: CarList;

  constructor(id: string) {
    super(id);
    this.createCars = new CreateCars('div', 'create-car-container');
    this.updateCars = new UpdateCars('div', 'update-car-container');
    this.race = new Race('div', 'buttons-race-container');

    // console.log((async () => {
    //   await GetCars(1);
    // })());
    const cars = GetCars(1).then(resolve => {
      return new CarList('main', 'garage-list', resolve.data);
    })
    console.log(cars)
    //this.garageList = new CarList('main', 'garage-list', );
  }

  render() {    
    this.container.append(this.createCars.render());
    this.container.append(this.updateCars.render());
    this.container.append(this.race.render());
    //this.container.append(this.garageList.render());
    return this.container;
  }
}

export default Garage;
