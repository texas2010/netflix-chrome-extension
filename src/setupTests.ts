// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { chrome } from 'jest-chrome';

const chromeStorageMock = {
  local: {
    get: function (keys, cb) {
      var item;
      if (keys) {
        var local = {};
        // create array if not already
        keys = Array.isArray(keys) ? keys : [keys];
        keys.forEach((key) => {
          // can be a simple string or a stringify
          try {
            local[key] = JSON.parse(localStorage.getItem(key));
          } catch (err) {
            local[key] = localStorage.getItem(key);
          }
        });
        cb(local);
      } else {
        item = { ...localStorage };
        Object.keys(item).forEach((key) => {
          item[key] = JSON.parse(item[key]);
        });
        cb(item);
      }
    },
    remove: function (keys, cb) {
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          localStorage.removeItem(key);
        });
      } else {
        localStorage.removeItem(keys);
      }

      if (cb) {
        cb();
      }
    },
    set: function (obj, cb) {
      const key = Object.keys(obj)[0];
      localStorage.setItem(key, JSON.stringify(obj[key]));
      if (cb) {
        cb();
      }
    },
    clear: function () {
      localStorage.clear();
    },
  },
  sync: {
    get: function (key, cb) {
      var item;
      if (key) {
        item = JSON.parse(sessionStorage.getItem(key));
        cb({ [key]: item });
      } else {
        item = { ...sessionStorage };
        Object.keys(item).forEach((key) => {
          item[key] = JSON.parse(item[key]);
        });
        cb(item);
      }
    },
    remove: function (keys, cb) {
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          sessionStorage.removeItem(key);
        });
      } else {
        sessionStorage.removeItem(keys);
      }

      if (cb) {
        cb();
      }
    },
    set: function (obj, cb) {
      const key = Object.keys(obj)[0];
      sessionStorage.setItem(key, JSON.stringify(obj[key]));
      if (cb) {
        cb();
      }
    },
  },
  onChanged: {
    addListener: function () {},
    removeListener: function () {},
  },
};

global.chrome = {
  ...chrome,
  storage: chromeStorageMock,
};
