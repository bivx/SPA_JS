(function() {}).render({
  "napisz": (function() {
    const addComent = document.getElementById("comment");
    addComent.addEventListener("click", function() {
      const title = document.getElementsByClassName("text")[0].value;
      const content = document.getElementsByClassName("text")[1].value;
      var params = {
        "title": title,
        "content": content,
        "email": window.loged
      };
      (function() {}).ajax("post", '/comment', params, function(data) {
        var data = JSON.parse(data);
        if (data.message === "success") {
          window.location.href = window.location.origin + "/#/moje-konto";
        } else {
          console.log(data.message);
        }
      });
    }, false);
  })
});
