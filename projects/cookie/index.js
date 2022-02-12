/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
//map с куками
const cookiesMap = getCookies();

//при перезагрузке очищаем фильтр
let filterValue = '';
//отрисовываем таблицу с куками
updateCookies();

filterNameInput.addEventListener('input', function () {
  filterValue = this.value;
  updateCookies();
});

addButton.addEventListener('click', (e) => {
  const name = addNameInput.value;
  const value = addValueInput.value;

  if (!name) {
    return;
  }

  document.cookie = `${name} = ${value}`;
  cookiesMap.set(name, value);

  updateCookies();
});

listTable.addEventListener('click', (e) => {
  const cookie = e.target.dataset.key;

  if (cookie) {
    document.cookie = cookie + `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    cookiesMap.delete(cookie);
  }
  updateCookies();
});

function getCookies() {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .reduce((prev, current) => {
      const [, value] = current.split('=');
      prev.name = value;

      return prev;
    }, new Map());
}

function updateCookies() {
  listTable.innerHTML = '';

  for (const [name, value] of cookiesMap) {
    if (filterValue && !isMaching(name, filterValue) && !isMaching(value, filterValue)) {
      continue;
    }

    listTable.innerHTML += `
      <tr>
        <td>${name}</td>
        <td class = 'value'>${value}</td>
        <td> 
          <button data-key="${name}">Удалить</button>
        </td>
      </tr>
    `;
  }
}

function isMaching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}
