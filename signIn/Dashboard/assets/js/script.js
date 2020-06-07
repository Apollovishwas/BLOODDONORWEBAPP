
var userID;
var role;

$(document).ready(function () {
//fetchingData
   
	configFirebase();
	//fetchData();
    //fetchReview();
    checkAuthentication();
    
	

});

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
  //firebase.analytics();
}

//just Checks if the user is signed in or not
function checkAuth() {
    
    var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
    console.log("User is SignedIn");
} else {
  // No user is signed in.
    console.log("User is not Signed In");
}
}


//check if the user is authenticated and redirects to the right profile page
function checkAuthentication(){
    console.log("CheckAuthentication Called");

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	 console.log("signed in");
	  userID = user.uid;
 setValueForFields();
	 
  } else {
    // No user is signed in.
	  console.log("nope");
  }
});
	
}

//upload Student's data
function uploadData() {
	console.log("data called");
	var companyNameVal = $('#companyName').val();
    var aboutInternShip = $('#aboutInternship').val();
    var addressVal = $('#address').val();
     var emailVal = $('#email').val();
   
    var BloodGroup = $('#BloodGroup').val();
    var pincode = $('#pincode').val();
    
    

    
    

   // console.log(whatsappVal,companyNameVal,aboutInternShip,designationVal,addressVal,skillsVal);
	var db = firebase.firestore();
    console.log(emailVal);
	db.collection("Users").doc(userID).set({
    email:emailVal,
 
    BloodGroup:BloodGroup,
    address:addressVal,
	companyName:companyNameVal,
	pincode:pincode,
	aboutYou:aboutInternShip,
    userID : userID
},{ merge: true })
.then(function() {
		 UIkit.notification({
            message: "<span uk-icon='icon: check'></span> Document Saved Successfully!",
            status: 'Danger',
            pos: 'top-right',
            timeout: 4000
        });
    console.log("Document successfully written!");
})
.catch(function(error) {
		UIkit.notification({
            message: "<span uk-icon='icon: close></span>"+error,
            status: 'Danger',
            pos: 'top-right',
            timeout: 5000
        });
    console.error("Error writing document: ", error);
});
    
   
}



//used to Signout
function signout() {
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



function setValueForFields() {
    console.log("SetValue Called");
      var db = firebase.firestore();
	db.collection("Users").doc(userID).onSnapshot(function(doc) {
    if (doc.exists) {
		 
		var companyData = doc.data();
        var Name = companyData.companyName;
        var aboutYou = companyData.aboutYou;
        var address = companyData.address;
        var bloodGroup = companyData.BloodGroup;
        var email = companyData.email;
        var pincode = companyData.pincode;

        $('#email').val(email);
        $('#pincode').val(pincode);
    
	 $('#companyName').val(Name);

     $('#aboutInternship').val(aboutYou);
    $('#address').val(address);
        $('#BloodGroup').val(bloodGroup);






        
		
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
		return;
    }
});
    
}





