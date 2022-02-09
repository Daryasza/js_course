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
// import './dnd.html';

const homeworkContainer = document.querySelector('#app');

function moveAt(pageX, pageY) {
  const divs = document.querySelectorAll('draggable-div');
  divs.forEach((div) => {
    div.style.left = pageX - div.offsetWidth / 2 + 'px';
    div.style.top = pageY - div.offsetHeight / 2 + 'px';
  });
}

document.addEventListener('mousemove', (e) => {
  moveAt(e.pageX, e.pageY);
});

//export

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
  newDiv.setAttribute('draggable', true);

  return newDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
