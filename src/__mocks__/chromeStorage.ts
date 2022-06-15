// @ts-nocheck
export const chromeStorageMock = {
  local: {
    get: function (keys: any, cb: Function) {
      var item: any;
      if (keys) {
        var local = {};
        // create array if not already
        keys = Array.isArray(keys) ? keys : [keys];
        keys.forEach((key: string) => {
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
    remove: function (keys: any, cb: Function) {
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
    set: function (obj: any, cb: Function) {
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
    get: function (key: any, cb: Function) {
      var item: any;
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
    remove: function (keys: any, cb: Function) {
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
    set: function (obj: any, cb: Function) {
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
