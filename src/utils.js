/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


/**
 * Передор дерева в меню
 * Возвращает меню каталогов
 * @param tree {Array<Object>} Масив перебранный в дерево меню
 * @param level {Number} Вложенность меню
 * @param result {Array<Object>}
 * @returns {Array<Object>}
 */

export function treeToMenu(tree, level = 0, result = []) {

  for (const item of tree) {
    result.push({_id:  item._id, title: '- '.repeat(level) + item.title, value:  item._id});
    if (item.children?.length) {
      treeToMenu(item.children, level + 1, result);
    }
  }
  return result;
}


/**
 * Передор масив категорий в дерево категорий
 * Возвращает дерево каталога
 * @param list {Array<Object>} Масив категорий
 * @returns {Array<Object>}
 */

export function listToTree(list) {

  const menu = {}
  const trees = {}

  list.map((item) => {
    const {_id} = item

    if (item.parent === null) {
      menu[_id] = item;
    }

    if (!trees[_id]) {
      trees[_id] = item;
      trees[_id].children = [];
    }

    if (item.parent?._id) {
      if (!trees[item.parent._id]) {
        trees[item.parent._id] = {children: []};
      }
      trees[item.parent._id].children.push(trees[_id]);
    }
  })
  return Object.values(menu);
}
