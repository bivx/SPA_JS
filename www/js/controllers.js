(function() {

  'use strict';

  window.loged = "";

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

  // create Node from json object
  // HTMLElement.prototype.createNodes =
  //   function(obj, parametr, newNode) {
  //     for (var i in obj) {
  //       if (obj.hasOwnProperty(i)) {
  //         if (obj[i][parametr]) {
  //           var el = document.createElement(newNode);
  //           el.innerHTML = obj[i][parametr];
  //           el.className = parametr;
  //           this.appendChild(el)
  //         }
  //       }
  //     }
  //   }

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
    }

})();
