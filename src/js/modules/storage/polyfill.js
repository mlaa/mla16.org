/*
 * LocalStorage polyfill
 * Based on https://gist.github.com/remy/350433 by Remy Sharp
 * Only implements getItem and setItem
 */

module.exports = function (Module) {

  'use strict';

  /* Wrap storage API tests in try/catch to avoid browser errors. */

  var LocalStorage;
  var SessionStorage;

  try {
    LocalStorage = window.localStorage;
    LocalStorage.setItem('TEST', '1');
    LocalStorage.removeItem('TEST');
  } catch (e) {
    LocalStorage = false;
  }

  try {
    SessionStorage = window.sessionStorage;
    SessionStorage.setItem('TEST', '1');
    SessionStorage.removeItem('TEST');
  } catch (e) {
    SessionStorage = false;
  }

  /* Provide polyfill if native support is not available. */

  if (!LocalStorage) {

    var Storage = function () {

      function createCookie (name, value, days) {

        var date;
        var expires;

        if (days) {
          date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = '; expires=' + date.toGMTString();
        } else {
          expires = '';
        }

        document.cookie = name + '=' + value + expires + '; path=/';

      }

      function readCookie (name) {

        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        var i;
        var c;

        for (i = 0; i < ca.length; i = i + 1) {
          c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
          }
        }

        return null;

      }

      function setData (data) {
        data = JSON.stringify(data);
        createCookie('localStorage', data, 365);
      }

      function getData () {
        var data = readCookie('localStorage');
        return data ? JSON.parse(data) : {};
      }

      // initialise if there's already data
      var data = getData();

      return {
        getItem: function (key) {
          return data[key] === undefined ? null : data[key];
        },
        setItem: function (key, value) {
          data[key] = value + ''; // forces the value to a string
          setData(data);
        }
      };
    };

    LocalStorage = new Storage();

  }

  Module.local = LocalStorage;

};
