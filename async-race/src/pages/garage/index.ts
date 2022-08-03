import Page from "../../core/templates/page";
import CreateCars from "../../core/components/create-cars";
import UpdateCars from "../../core/components/update-cars";
import Race from "../../core/components/race";

class Garage extends Page{
  static TextObject = {
    garageTitle: 'Garage',
    
  };
  private createCars: CreateCars;
  private updateCars: UpdateCars;
  private race: Race;

  constructor(id: string) {
    super(id);
    this.createCars = new CreateCars('div', 'create-car-container');
    this.updateCars = new UpdateCars('div', 'update-car-container');
    this.race = new Race('div', 'buttons-race-container');
  }

  render() {
    const title = this.createHeader(Garage.TextObject.garageTitle);
    this.container.append(this.createCars.render());
    this.container.append(this.updateCars.render());
    this.container.append(this.race.render());
    this.container.append(title);
    return this.container;
  }
}

export default Garage;
