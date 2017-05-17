(function() {}).render({
  "moje-konto": (function() {

    var params = {
      "email": window.loged
    }

    const parent = document.getElementsByClassName("panel panel-info")[0];
    (function() {}).ajax("post", '/my-account', params, function(data) {
      var data = JSON.parse(data);
      parent.createNodes(data.com, "title", "content", "div", "panel-heading", "panel-body");
    })
  })
});
