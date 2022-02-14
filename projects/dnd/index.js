/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
const addDivButton = homeworkContainer.querySelector('#addDiv');

let currentDiv;
let startX = 0;
let startY = 0;

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

function createDiv() {
  const newDiv = document.createElement('div');

  // toString(16) преобразует число в строку, используя шестнадцатеричное основание;
  // Math.random() генерирует случайное число с плавающей точкой от 0 до 1;
  // Math.floor() округляет число в меньшую сторону;
  const randomColor = '#' + Math.round(Math.random() * 16777215).toString(16);
  const randomWidth = Math.floor(Math.random() * 150);
  const randomHeight = Math.floor(Math.random() * 150);
  const randomPosY = Math.floor(Math.random() * (window.innerHeight - 150));
  const randomPosX = Math.floor(Math.random() * (window.innerWidth - 150));

  newDiv.style.cssText = `
    background-color: ${randomColor};
    width: ${randomWidth}px;
    height:${randomHeight}px;
    top: ${randomPosY}px;
    left: ${randomPosX}px;
  `;
  newDiv.classList.add('draggable-div');

  document.addEventListener('mousedown', (e) => {
    if (e.target !== newDiv) return;

    currentDiv = e.target;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  document.addEventListener('mouseup', (e) => {
    if (e.target !== newDiv) return;

    currentDiv = false;
  });

  return newDiv;
}

document.addEventListener('mousemove', (e) => {
  if (currentDiv) {
    currentDiv.style.top = e.pageY - startY + 'px';
    currentDiv.style.left = e.pageX - startX + 'px';
  }
});

export { createDiv };
