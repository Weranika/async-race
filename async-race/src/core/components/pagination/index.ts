import Component from "../../templates/components";
import './pagination.scss';

class Pagination extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  createPaginationButtons () {
    const prevButt = document.createElement('button');
    prevButt.id = 'prev-butt';
    prevButt.className = 'pagination';
    prevButt.innerText = 'PREV';
    this.container.append(prevButt);

    const nextButt = document.createElement('button');
    nextButt.id = 'next-butt';
    nextButt.className = 'pagination';
    nextButt.innerText = 'NEXT';
    this.container.append(nextButt);
  }
  render() {
    this.createPaginationButtons ();
    return this.container;
  }
}

export default Pagination;
