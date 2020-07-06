const { response } = require("express");

/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    url = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return localStorage.user
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data = this.current(), callback = (response) => {
    if (!response.success && !response.name) {
      this.unsetCurrent();
    } else if (!response.success) {
      console.log(response.error);
    } else {
      this.setCurrent('user', response.user);
    }
  })
  {
    let xhr = createRequest(data, callback);
    return xhr
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = (response) => {
    if (!response.success) {
      console.log(response.error)
    } else {
      this.setCurrent('user', response.user);
    }
  } ) {
    let xhr = createRequest(data, callback);
    return xhr
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = (response) => {
    if (!response.success) {
      console.log(response.error.email);
      console.log(response.error.password)
    } else {
      this.setCurrent('user', response.user);
    }
  } ) {
    let url = '/register';
    let xhr = createRequest(url, data, callback);
    return xhr
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = (response) => {
    if (response.success) {
      this.unsetCurrent();
    }
  } ) {
    let url = '/logout';
    let xhr = createRequest(url, data, callback);
    return xhr
  }
}
