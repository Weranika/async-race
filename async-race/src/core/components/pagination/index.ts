import Component from "../../templates/components";
import './pagination.scss';
import { nextHandler, prevHandler } from "../../../pages/app/hendlers";

const currPage = localStorage.getItem('page') as string;
class Pagination extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  createPaginationButtons () {
    const prevButt = document.createElement('button');
    prevButt.id = 'prev-butt';
    prevButt.className = 'pagination';
    prevButt.innerText = 'PREV';
    //+currPage === 1 ? prevButt.disabled = true : prevButt.disabled = false;
    prevButt.addEventListener("click", prevHandler);
    this.container.append(prevButt);

    const nextButt = document.createElement('button');
    nextButt.id = 'next-butt';
    nextButt.className = 'pagination';
    nextButt.innerText = 'NEXT';
    nextButt.addEventListener("click", nextHandler);
    this.container.append(nextButt);
  }
  render() {
    this.createPaginationButtons ();
    return this.container;
  }
}

export default Pagination;
