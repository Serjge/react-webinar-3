import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      count: 0,
      isLoading: true,
      page: 1,
      contentPerPage: 10,
    }
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items
    }, 'Загружены товары из АПИ');
  };


  async setPage(page) {

    this.setState({
      ...this.getState(),
      page
    });
    await this.loadProducts()
  };

  /**
   * запрос каталога с страницами
   */
  async loadProducts() {
    const skip = this.getState().page * this.getState().contentPerPage - this.getState().contentPerPage

    this.setState({...this.getState(), isLoading: true})
    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      isLoading: false,
    }, 'Запрос страницы товара');
  }
}

export default Catalog;
