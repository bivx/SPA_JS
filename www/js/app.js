(function() {

  'use strict';

  var obj = {};
  var store = [];

  Function.prototype.render = function(obj) {

    if (typeof obj === "object") {
      store.push(obj);
      localStorage.setItem(Object.keys(obj)[0], obj[Object.keys(obj)[0]].toString());
    }
  };

  function init(el) {
    if (el && store.length) {
      for (var i in store) {
        if (store.hasOwnProperty(i)) {
          if (store[i][el]) {
            store[i][el]();
          }
        }
      }
    } else if (el && !store.length) {
      var getEl = localStorage.getItem(el);
    }
  }

  function helper(e) {
    var route = document.getElementById('views');
    var currentUrl = e;
    var el = currentUrl.substring(currentUrl.indexOf('#') + 2);
    if (el.trim() != 0) {
      var a = document.getElementById(el);
      var node = document.createElement('div');
      node.innerHTML = a.firstChild.textContent;
      route.removeChild(route.firstChild);
      route.appendChild(node);
      init(el);
    }
  }

  function router() {
    if (window.performance || performance.navigation.type == 1) {
      helper(window.location.href);
    }
    window.addEventListener("hashchange", function(e) {
      helper(e.newURL);
    }, false);
  }
  router();


})();
