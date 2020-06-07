$(document).ready(function () {
//fetchingData
   
	configFirebase();
	//fetchData();
    //fetchReview();
    
    checkAuth();
    

	

});
    var userID;
 var previousColor = 0;
var userEmail;
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


function signUp() {
    var email= $('#email').val();
    userEmail = email;
    var password = $('#password').val();
    var repeatPassword = $('#repeatPassword').val();
    var checkbox = document.getElementById("Checkbox");
    console.log(email,password);

    if(password == repeatPassword && checkbox.checked) {
        

  
        
        
        
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            
            checkAuthentication();

}).catch(function(error) {
  // An error happened.
                   UIkit.notification({
    message: "<span uk-icon='icon: close'></span>"+error,
    status: 'Danger',
    pos: 'top-right',
    timeout: 5000
});
          
});
        
        
    }
    else {
        if(checkbox.checked) {
               
               UIkit.notification({
    message: "<span uk-icon='icon: close'></span> Password Dont Match",
    status: 'Danger',
    pos: 'top-right',
    timeout: 5000
});
    
        }
        else { 
               UIkit.notification({
    message: "<span uk-icon='icon: close'></span> Please agree to the terms and Conditions!",
    status: 'Danger',
    pos: 'top-right',
    timeout: 5000
});
        }

    }
    
    
}


function checkAuthentication(){

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	 console.log("signed in");
	  userID = user.uid;
      
      
          var role = "Student";
                console.log(userID);

 
		
          checkAuth();
        window.location.href = "../Dashboard/index.html";

	 
  } else {
    // No user is signed in.
	  console.log("nope");
  }
});
	
}
function checkAuth() {
    
    var user = firebase.auth().currentUser;

if (user) {
 window.location.href = "../Dashboard/index.html";
    // User is signed in.
    console.log("User is SignedIn");
} else {
  // No user is signed in.
    console.log("User is not Signed In updated");
}
}


function signOut() {
    firebase.auth().signOut().then(function() {
                   UIkit.notification({
    message: "<span uk-icon='icon: check'></span> signout Successfull",
    status: 'Danger',
    pos: 'top-right',
    timeout: 5000
});
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
                   UIkit.notification({
    message: "<span uk-icon='icon: close'></span> Signout failed",
    status: 'Danger',
    pos: 'top-right',
    timeout: 5000
});
});
}

