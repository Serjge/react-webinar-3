import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Добавление товара в корзину
   */
  addToBasket(code) {
    let sum = 0;

    let exists = false;
    const items = this.state.basket.items.map(item => {
      let result = item;

      if (item.code === code) {
        exists = true;
        result = {...item, amount: item.amount + 1};
      }

      sum += result.price * result.amount;
      return result
    });

    if (!exists) {
      console.log(code)
      console.log(this.state.list)
      const item = this.state.list.find(item => item.code === code)

      items.push({...item, amount: 1});
      console.log(item)
      sum += item.price;
    }

    this.setState({
      ...this.state,
      basket: {
        items,
        sum,
        amount: items.length
      }
    });
  };
}

export default Store;
