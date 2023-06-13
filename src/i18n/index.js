import translate from "src/i18n/translate";

class I18nService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config
    this.lang = this.config.lang
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
   * Установка языка
   * @param lang {String} Название заголовка
   */
  setLang(lang) {
    if (lang) {
      this.lang = lang;
    }
    for (const listener of this.listeners) listener();
  }

  /**
   * Установленный язык
   */
  getLang() {
    return this.lang
  }

  /**
   *  Функция для локализации текстов с замыканием на код языка
   *  @param text {String} Название заголовка
   *  @param plural {Number} Число для плюрализацииНазвание заголовка
   *  @param lang {String} Код языка
   */
  getTranslate  (text, plural,lang=this.lang) {
    return translate(lang, text, plural)
  }

}

export default I18nService;
