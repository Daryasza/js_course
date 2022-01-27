/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */

// import {assertArray} from "@babel/core/lib/config/validation/option-assertions";

function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
}

forEach([1, 2, 5, 6, 7], (el) => console.log(el * el));
/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
function map(array, fn) {
  const newArray = [];

  array.forEach((element) => {
    newArray.push(fn(element));
  });

  return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */

function reduce(array, fn, initial) {
  let total;

  if (initial === undefined) {
    total = undefined;
  } else {
    total = initial;
  }

  for (let i = 0; i < array.length; i++) {
    if (total === undefined) {
      total = array[i];
      continue;
    }

    total = fn(total, array[i]);
  }

  return total;
}

reduce([1, 2, 3], (all, current) => all + current);

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

// eslint-disable-next-line no-unused-vars
function upperProps(obj) {
  const uppercasedArray = Object.keys(obj).map((element) => element.toUpperCase());

  return uppercasedArray;
}

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */

function createProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, val) {
      if (typeof val == 'number') {
        target[prop] = val * val;

        return true;
      } else {
        return false;
      }
    },
  });
}

export { forEach, map, reduce, upperProps, createProxy };
