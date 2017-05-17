(function() {}).render({
  "logowanie": (function() {
    (function() {
      const login = document.getElementById('login');
      const repeatPassword = document.getElementById('register');
      login.addEventListener('click', function() {
        var email = document.getElementsByClassName('form-control')[1].value;
        var password = document.getElementsByClassName('form-control')[2].value;
        var params = {
          "email": email,
          "password": password,
        };

        (function() {}).ajax("post", '/login', params, function(data) {
          var data = JSON.parse(data);
          if (data.message === "success") {
              window.loged = data.email;
            window.location.href = window.location.origin + "/#/napisz";
          } else {
            document.getElementById("form-error").textContent = data.message;
          }
        })
      }, false);

      const newRegister = document.getElementsByClassName("btn-register")[0];
      newRegister.addEventListener("click", function() {
        newRegister.style.display = "none";
        repeatPassword.style.display = "table";

        const register = document.getElementsByClassName("register-now")[0];
        document.getElementsByClassName("wraper-register")[0].style.display = "block";
        login.style.display = "none";
        register.addEventListener("click", function() {
          var email = document.getElementsByClassName('form-control')[1].value;
          var password = document.getElementsByClassName('form-control')[2].value;
          const passwordRepeatBtn = document.getElementsByClassName('password')[0].value;
          var params = {
            "email": email,
            "password": password,
            "repeatPassword": passwordRepeatBtn
          };
          (function() {}).ajax("post", '/register', params, function(data) {
            var data = JSON.parse(data);
            if (data.message === "success") {
              window.loged = data.email;
              window.location.href = window.location.origin + "/#/napisz";
            } else {
              document.getElementById("form-error").textContent = data.message;
            }
          })
        }, false);
      }, false);
    })();
  })
});
