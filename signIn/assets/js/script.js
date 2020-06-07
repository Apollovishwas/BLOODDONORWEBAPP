$(document).ready(function () {


    configFirebase();

   


});
var previousColor = 0;
//configuringFireBase
function configFirebase() {
   var firebaseConfig = {
    apiKey: "AIzaSyDXHOTiJ8DxGRzenYTTtytTY_yFZ-iEbSc",
    authDomain: "a-tvoquy.firebaseapp.com",
    databaseURL: "https://a-tvoquy.firebaseio.com",
    projectId: "a-tvoquy",
    storageBucket: "a-tvoquy.appspot.com",
    messagingSenderId: "192403781951",
    appId: "1:192403781951:web:e46d4980d56f5ed86afb8a"
  };
    // Initialize Firebase



    if (!firebase.apps.length) {
        console.log("called");
        firebase.initializeApp(firebaseConfig);
    }
    firebase.analytics();
     
}


function signIn() {
    
    var email = $('#email').val();
    var password = $('#password').val();

    console.log(email, password)


    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        UIkit.notification({
            message: "<span uk-icon='icon: check'></span> signin Successfull",
            status: 'Danger',
            pos: 'top-right',
            timeout: 5000
        });
 window.location.href = "Dashboard/index.html";

        checkAuth();
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
        UIkit.notification({
            message: "<span uk-icon='icon: close'></span>" + error,
            status: 'Danger',
            pos: 'top-right',
            timeout: 5000
        });
        checkAuth();
    });






}


function checkAuth() {
    
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
       UIkit.notification({
            message: "<span uk-icon='icon: check'></span> signin Successfull",
            status: 'Danger',
            pos: 'top-right',
            timeout: 5000
        });
    // User is signed in.
 window.location.href = "Dashboard/index.html";
    
  } else {
    // No user is signed in.
      console.log("nope");
      
  }
});

}


