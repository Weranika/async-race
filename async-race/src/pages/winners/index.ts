import Page from "../../core/templates/page";

class WinnersPage extends Page{
  static TextObject = {
    winnersTitle: 'Winners',
  };

  constructor(id: string) {
    super(id);
  }

  async render() {
    const title = this.createHeader(WinnersPage.TextObject.winnersTitle);
    this.container.append(title);
    return this.container;
  }
}

export default WinnersPage;
