
// Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.
// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми.
// Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);


const STORAGE_KEY = 'feedback-form-state';
const data = {};

fillForm();

function onFormInput(event) {
  data[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log(data);
}

function fillForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    const inputRef = formRef.querySelector('input');
    const textareaRef = formRef.querySelector('textarea');
    inputRef.value = savedData.email ? savedData.email : '';
    textareaRef.value = savedData.message ? savedData.message : '';
    data.email = savedData.email;
    data.message = savedData.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (data.email && data.message) {
    console.log(data);
    data.email = '';
    data.message = '';
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}


