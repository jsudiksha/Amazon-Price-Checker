console.log("Background is working");


// $.ajax({
//   url: "http://localhost:8000/save-products",
//   data: { test: "test data" },
//   type: "POST",
//   success: function (response) {
//     console.log("response: ", response);
//   },
//   error: function (response) {
//     console.log("response: ", response);
//   },
// });
var firebaseConfig = {
  apiKey: "AIzaSyBbpY_2ZxsGwUs0RXwuSz6mYMKctrFBrhM",
  authDomain: "sc-9c50e.firebaseapp.com",
  projectId: "sc-9c50e",
  storageBucket: "sc-9c50e.appspot.com",
  messagingSenderId: "99123793189",
  appId: "1:99123793189:web:7f7ec7e950fe5f7af2decc",
  measurementId: "G-J9NGQ39B0D",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

console.log("Background is working with server on");

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type == "SignUp") {
    function signUp() {
      var email = msg.email;
      var password = msg.password;

      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise.catch((e) => alert(e.message));

      alert("Signed Up");
    }
    signUp();
  } else if (msg.type == "SignIn") {
    function signIn() {
      const promise = auth.signInWithEmailAndPassword(msg.email, msg.password);
      promise.catch((e) => alert(e.message));
      //  userEmail = msg.email;
      localStorage.setItem("userEmail", msg.email);
      console.log("look here " + localStorage.getItem("userEmail"));
       
    }
    signIn();
      auth.onAuthStateChanged(function (user) {

        if (user) {
            //window.location = "home.html";
            // chrome.browserAction.setPopup({
            //     popup:"work.html"
            //  });
            alert(msg.email+ " signed in");

             //document.getElementById('details').innerHTML = localStorage.getItem("emaildata");
            //is signed in
        } else {

            //alert("No Active User");
            //no user is signed in
        }
    });
  } else if (msg.type == "SignOut") {
    function signOut() {
      auth.signOut();
    }
    signOut();
    auth.onAuthStateChanged(function (user) {
      if (user) {
        alert("Signed Out");
      } else {
        alert("No Active User");
      }
    });
  } else if (msg.type == "product") {
    console.log("product link recieved in background")
    console.log(msg.url);
    console.log(msg.minPrice);
    console.log(msg.type);
    $.ajax({
      url: "http://localhost:8000",
      data: { url: msg.url, minPrice: msg.minPrice, email: localStorage.getItem("userEmail")},
      type: "POST",
      success: function (response) {
        console.log("response: ", response);
      },
      error: function (response) {
        console.log("response: ", response);
      },
    });
  }
});
