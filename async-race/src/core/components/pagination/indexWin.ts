import Component from "../../templates/components";
import './pagination.scss';
import { nextHandlerWin, prevHandlerWin } from "../../../pages/app/hendlers";

const currPage = localStorage.getItem('pageWinners') as string;
class Pagination extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  createPaginationButtons () {
    const prevButt = document.createElement('button');
    prevButt.id = 'prev-butt';
    prevButt.className = 'pagination';
    prevButt.innerText = 'PREV';    
    prevButt.addEventListener("click", prevHandlerWin);
    this.container.append(prevButt);

    const nextButt = document.createElement('button');
    nextButt.id = 'next-butt';
    nextButt.className = 'pagination';
    nextButt.innerText = 'NEXT';
    nextButt.addEventListener("click", nextHandlerWin);
    this.container.append(nextButt);
  }
  render() {
    this.createPaginationButtons ();
    return this.container;
  }
}

export default Pagination;
