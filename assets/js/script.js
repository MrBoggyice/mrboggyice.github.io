(function(){
  /* Initialize Firebase */
  var config = {
    apiKey: "AIzaSyBHZoPj5BrPFuy1ZXtmdfVpEOOkw5ExdfI",
    authDomain: "painttheweb-d1f76.firebaseapp.com",
    databaseURL: "https://painttheweb-d1f76.firebaseio.com"
  };
  firebase.initializeApp(config);

  /* Get all form elements & buttons */
  var signupEmail     = document.getElementById('signupEmail');
  var signupPassword  = document.getElementById('signupPassword');
  var btnSignup       = document.getElementById('btnSignup');
  var loginEmail      = document.getElementById('loginEmail');
  var loginPassword   = document.getElementById('loginPassword');
  var btnLogin        = document.getElementById('btnLogin');
  var btnLogout       = document.getElementById('btnLogout');
  var navLogin        = document.getElementById('navLogin');
  var navSignup       = document.getElementById('navSignup');
  var alienView       = document.getElementById('alienView');
  var memberView      = document.getElementById('memberView');
  var errorFlash      = document.getElementById('errorFlash');
  var successFlash    = document.getElementById('successFlash');
  var loginFlash      = document.getElementById('loginFlash');
  var loginError      = document.getElementById('loginError');

  /* Login event */
  btnLogin.addEventListener("click", function(e){
    loginFlash.classList.remove('hide');

    var email = loginEmail.value;
    var pass = loginPassword.value;
    var auth = firebase.auth();

    /* Login user */
    var promise = auth.signInWithEmailAndPassword(email, pass);
    promise
      .then(function(){
        location.reload();
      })
      .catch(function(e) {
        /* Flash and log errors*/
        loginError.classList.remove('hide');
        loginFlash.classList.add('hide');
        var errorCode = e.code;
        var errorMessage = e.message;
        console.log(errorCode, errorMessage);
      })
  });

  /* Signup event */
  btnSignup.addEventListener("click", function(e){
    successFlash.classList.remove('hide');
    //TODO: BE SURE EMAIL IS VALID
    var email = signupEmail.value;
    var pass  = signupPassword.value;
    var auth  = firebase.auth();

    /* Sign up user */
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .then(function() {
        location.reload();
      })
      .catch(function(e) {
        /* Flash and log errors*/
        errorFlash.classList.remove('hide');
        successFlash.classList.add('hide');
        var errorCode = e.code;
        var errorMessage = e.message;
        console.log(errorCode, errorMessage);
    })
  });

  /* Logout user */
  btnLogout.addEventListener("click", function(e){
    firebase.auth().signOut();
  });

  /* Real time event on authentication state */
  firebase.auth().onAuthStateChanged(function(firebaseUser){

    /* Check if a user exists */
    if(firebaseUser){

      btnLogout.classList.remove('hide');
      navLogin.classList.add('hide');
      navSignup.classList.add('hide');
      alienView.classList.add('hide');
      memberView.classList.remove('hide');
      console.log(firebaseUser);

    }else{

      btnLogout.classList.add('hide');
      navLogin.classList.remove('hide');
      navSignup.classList.remove('hide');
      alienView.classList.remove('hide');
      memberView.classList.add('hide');
      console.log("Not logged in")
    }

  })

}());
