import {listToTree, treeToMenu} from "src/utils";
import StoreModule from "../module";

/**
 * Состояние меню фильтра
 */
class Categories extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      menu: [{_id: '', title: 'Все', value: ''}],
    };
  }

  /**
   * Устанвока параметров и загрузка списка товаров

   * @returns {Promise<void>}
   */
  async setCategories() {
    const response = await fetch(`/api/v1/categories?lang=ru&limit=*&fields=title, parent,_id`);
    const json = await response.json();

    const treeMenu = listToTree(json.result.items)

    const sortMenu = treeToMenu(treeMenu, 0, [{_id: '', title: 'Все', value: ''}])

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      menu: sortMenu,
      waiting: false,
    });
  }
}

export default Categories;
