import React from 'react';
import {createRoot} from 'react-dom/client';
import {counter} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: counter(), title: 'Название элемента'},
    {code: counter(), title: 'Некий объект'},
    {code: counter(), title: 'Заголовок'},
    {code: counter(), title: 'Очень длинное название элемента из семи слов'},
    {code: counter(), title: 'Запись'},
    {code: counter(), title: 'Шестая запись'},
    {code: counter(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
