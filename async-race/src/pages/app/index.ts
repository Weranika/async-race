import Garage from "../garage";
import Page from "../../core/templates/page";
import WinnersPage from "../winners";
import Header from "../../core/components/header";
import ErrorPage, { ErrorTypes } from '../error';
import '../../global.scss';

export const enum PageIds {
  GaragePage = 'garage-page',
  WinnersPage = 'winners-page',
}

class App {
  private static container: HTMLElement = document.body;
  private initialPage: Page;
  private header: Header;  
  private static defaultPageId = 'current-page';

  static async renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.GaragePage || idPage ==='') {
      page = new Garage(idPage);
    } else if (idPage === PageIds.WinnersPage) {
      page = new WinnersPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = await page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  public enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
      console.log('hash')
    });
  }

  constructor() {
    this.initialPage = new Garage('garage-page');
    this.header = new Header('header', 'header-container');
  }

  run() {
    App.container.append(this.header.render());
    App.renderNewPage('garage-page');
    this.enableRouteChange();
  }
}
export default App;
