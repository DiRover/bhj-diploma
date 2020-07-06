/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
'use strickt'
const createRequest = (options = {}) => {
  let str = "";
  let strURL;
  let data;
  let formData;
  let xhr = new XMLHttpRequest(); //создаём запрос 
  try {
    if (options.method !== 'GET') { //проверяем какой метода используется 
      formData = new FormData; //если метод отличный от GET, тогда данные отправляем через FormData
      for (let key in options.data){
        formData.append( key, options.data[key] ); // прикручиваем data
      }
      xhr.open(options.method, options.url); //отправляем запрос
    } else {
      for (let key in options.data) { //создаём из объекта data строку для адреса
        str += key+'='+options.data[key]+'&'; //получаем строку
    }  
      strURL = str.slice(0, str.length - 1); //обезаем последний символ '&'
      xhr.open( 'GET', `?${strURL}${options.url}`); //вставляем в адрес
    }
      xhr.withCredentials = true; // так в задании, передать куки для кросс-доменного запроса
      xhr.send(formData); //отправляем форму
      xhr.onloadend = function() { //обрабатываем ответ сервера
        data = JSON.parse(this.responseText);
        options.callback(data);
        /*if (!data.success) { //проверяем успешность запроса
          options.callback(data.error);
        } else {
          options.callback(null, data.response);
        }*/
      }
  } catch(e) { //ловим ошибку
    options.callback(e);
  }
  return xhr
}