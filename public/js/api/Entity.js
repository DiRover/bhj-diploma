/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
    url = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * callback = (f) => f
   * */
  static list( data, callback = (response) => {
    if (!response.success) {
      console.log(response.error)
    } else {
      console.log(response)
    }
  } ) {
    let xhrList = createRequest(data, callback);
    return xhrList
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = (response) => {
    if (!response.success) {
      console.log(response.error)
    } else {
      console.log(response)
    }
  } ) {
    let dataCreat = {...data, _method: 'PUT'};
    let xhrCreate = createRequest(dataCreat, callback);
    return xhrCreate
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( data, callback = (response) => {
    if (!response.success) {
      console.log(response.error)
    } else {
      console.log(response)
    }
  } ) {
      let dataGet = {...data, id: id};
      let xhrGet = createRequest(dataGet, callback);
      return xhrGet
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( data, callback = (response) => {
    if (!response.success) {
      console.log(response.error)
    } else {
      console.log(response)
    }
  } ) {
      let dataRemove = {...data, id: id, _method: 'DELETE'};
      let xhrRemove = createRequest(dataRemove, callback);
  }
}

