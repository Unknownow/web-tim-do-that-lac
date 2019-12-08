export const CookieFunctions = {
  writeCookie: function(name, value, days) {
    var date, expires;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }

    value = btoa(value);
    for (let index = 0; index < value.length; index++) {
      if (index % 2 === 1) {
        let x = Math.random()
          .toString(36)
          .substring(4, 5);
        value = value.slice(0, index) + x + value.slice(index);
      }
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  },
  readCookie: function(name) {
    var i,
      c,
      ca,
      nameEQ = name + "=";
    ca = document.cookie.split(";");
    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        let value = c.substring(nameEQ.length, c.length); // read from cookie

        for (let index = 0; index < value.length; index++) {
          if (index % 2 === 1 && value.length % 2 === 1) {
            let part1 = value.substring(0, index);
            let part2 = value.substring(index + 1, value.length);
            value = part1 + part2;
          }
          if (index % 2 === 0 && value.length % 2 === 0) {
            let part1 = value.substring(0, index);
            let part2 = value.substring(index + 1, value.length);
            value = part1 + part2;
          }
        }
        value = atob(value);
        return value;
      }
    }
    return "";
  },
  deleteCookie: function(name) {
    document.cookie = name + "=; expires=2019-11-22T16:18:37.000Z;path=/";
  }
};
