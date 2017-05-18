(function() {

  'use strict';

  Function.prototype.ajax = function(method, url, data, success) {
    if (method === "get") {
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('GET', url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
      return xhr;
    } else {
      var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
      ).join('&');

      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState > 3 && xhr.status == 200) {
          success(xhr.responseText);
        }
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(params);
      return xhr;
    }
  }



  HTMLElement.prototype.createNodes =
    function(obj, parametr, parametr2, newNode, name, name2) {
      var that = this;
      obj.forEach(function(el, idx, arr) {
        var param = el["0"][parametr]
        if (param) {
          var elem = document.createElement(newNode);
          elem.innerHTML = param;
          elem.className = name;
          that.appendChild(elem);
        }
        if (el["0"][parametr2]) {
          var e = document.createElement(newNode);
          e.innerHTML = el["0"][parametr2];
          e.className = "panel-body";
          that.appendChild(e);
        }
      })
    };

  if (!window.loged) {
    document.getElementsByClassName("list-account")[0].style.display = "none";
    document.getElementsByClassName("list-comment")[0].style.display = "none";
  }

  const navButton = document.getElementsByClassName("navbar-toggle")[0];
  const parentNode = document.getElementsByClassName("menu-toggle")[0];
  const chidlNode = document.getElementById('bs-example-navbar-collapse-1');
  navButton.addEventListener("click", function() {
    navButton.style.display = "none";
    chidlNode.className = "";
    chidlNode.style.display = "block";
    parentNode.appendChild(chidlNode);
    const close = document.getElementById('menu-close');
    close.style.display = "block";

    close.addEventListener("click", function() {
      navButton.style.display = "block";
      close.style.display = "none";
      chidlNode.style.display = "none";
    }, false);
  }, false)
})();
