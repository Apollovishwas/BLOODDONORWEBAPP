$(document).ready(function () {
//fetchingData
   
	configFirebase();
    checkAuth();
	fetchData();
    
    
	

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
  
}


var darkColor =["#859e38","#d49c03","#0d52c9","#808080","#05d146","#9caf27","#0d9bc9","#18be97","#2305d1","#4b36a1","#a23440","#c55911","#04add2"];
var lightColor =["#ecf2d9","#fef1cd","#cfdffc","#e6e6e6","#cdfedd","#f1f6d5","#cff1fc","#d2f9f0","#d4cdfe","#ded9f2","#f3d8db","#fbe1d0","#cdf5fe"];


function fetchData() {
    
    console.log("Fetch Data Called")
    
      var db = firebase.firestore();
	db.collection("Users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var companyData = doc.data();
        var companyName = companyData.companyName;
        var BloodGroup = companyData.BloodGroup;
        var about = companyData.aboutYou;
        var address = companyData.address;

        var email = companyData.email;
        var pincode = companyData.pincode;


        logo = companyData.companyLogo;
        
        updateUI(companyName,about,BloodGroup,address,email,pincode);
    });
});
	//count to iterate through the firebase document
	
	

}



function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//This function used to update the UI of the Top Company Cards
function updateUI(companyName,about,BloodGroup,address,email,pincode) {
    
   var modifiedEmail = "\'" + email + "\'";
      var colorNumber;
 for (var a = [0, 1, 2, 3, 4,5,6,7,8,9,10,11,12], i = a.length; i--; ) {
    colorNumber = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    console.log(colorNumber);
}
	//console.log(companyName,companyLogo);	  
    var html = [         
                            '<div class="cardDiv animated fadeInRight" >',
                                '<div id = "cardMobile" class="card companyCard" style="background-color:'+lightColor[colorNumber]+'">',
                                    '<div class="card-body">',
                                        '<div class="contentDiv">',
                                            '<h4 class="companyName" style="color:'+darkColor[colorNumber]+'" >'+companyName+'</h4>',
                                            '<h6 class="text-muted mb-2">'+address+' - '+pincode+'</h6>',
    
                                        '</div>',       
                                        '<p class="card-text infoAboutPosition">'+about+'</p>',
        '<p class="card-text infoAboutPosition">'+BloodGroup+'</p>',
                '<p class="card-text infoAboutPosition">'+email+'</p>',
        '<button class = "btn btn-primary" onclick = "copyData('+modifiedEmail+')">Chat on hangout</button>',

                                    '</div>',
                                '</div>',
                            '</div>',
               ].join("\n");

    
    $(".lds-roller").hide();
    $(".browseCompanyCard").append(html);
    
}



function checkAuth() {
    
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     console.log("User logged in");
       var html = [
    '<li class="nav-item" role="presentation"><a class="nav-link " href="../studentDashboard/index.html">Your Profile</a></li>'].join("\n");
    $(".navbar-nav").append(html);
      
      $(".signInTab").remove();
    // User is signed in.
  } else {
    // No user is signed in.
      console.log("nope");
      
  }
});
    
    
    

}






function copyData(element) {
       var range, selection, worked;

  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  
  try {
    document.execCommand('copy');
    alert('text copied');
  }
  catch (err) {
    alert('unable to copy text');
  }
}



