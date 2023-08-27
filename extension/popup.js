let amazonextension = angular.module("amazonextension", ["ui.router"]);
let SignedIn = document.getElementById("SignInBtn");
let SignedUp = document.getElementById("SignUpBtn");
let SignedOut = document.getElementById("SignOutBtn");
let ProductSubmit = document.getElementById("productLink");
let login_link=document.getElementById("login_link");
let add_product=document.getElementById("add_product");
let signup_link=document.getElementById("signup_link");



amazonextension.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("login", {
      url: "/login",
      templateUrl: "login.html",
      controller: "MainCtrl",
    });

    $stateProvider.state("Sign up", {
      url: "/signup",
      templateUrl: "signup.html",
      controller: "MainCtrl",
    });
    $stateProvider.state("Add Product", {
      url: "/work",
      templateUrl: "work.html",
      controller: "MainCtrl",
    });

    $urlRouterProvider.otherwise("login");
  },
]);

document.getElementById("logo").addEventListener("click",()=>{
  window.open("http://www.amazon.in");
})
let SignUp = async function () {
  let customer = new Object();
  customer.type = "SignUp";
  customer.username = document.getElementById("username").value;
  customer.email = document.getElementById("email").value;
  customer.password = document.getElementById("password").value;
  customer.createdAt = document.getElementById("createdAt").value;
  await login_link.click();
  SignedIn.style.visibility="visible";
  SignedOut.style.visibility="hidden";
  SignedUp.style.visibility="hidden";
  ProductSubmit.style.visibility="hidden";
  console.log(customer);
  $("#SignUpBtn").on("click", function (e) {
    e.preventDefault();
  });
  console.log("SignUp for " + customer.email + " successful");

  chrome.runtime.sendMessage(customer);
};
SignedUp.addEventListener("click", SignUp);

let SignIn = function () {
  
  let member = new Object();
  member.type = "SignIn";
  member.email = document.getElementById("email").value;
  member.password = document.getElementById("password").value;
  $("#SignInBtn").on("click", function (e) {
    e.preventDefault();
  });
  SignedIn.style.visibility="hidden";
  SignedOut.style.visibility="visible";
  // add_product.style.visibility="visible";
  ProductSubmit.style.visibility="visible";
  add_product.click();
  console.log("SignIn for " + member.email + " successful");
  chrome.runtime.sendMessage(member);
  
};
SignedIn.addEventListener("click", SignIn);

if(add_product.style.visibility=="visible")
{
  SignedOut.style.visibility="visible";
  ProductSubmit.style.visibility="visible";
}
let SignOut = function () {
  let member = new Object();
  member.type = "SignOut";
  // member.email = document.getElementById("email").value;

  SignedOut.style.visibility="hidden";
  SignedIn.style.visibility="visible";
  ProductSubmit.style.visibility="hidden";

  login_link.click();

  $("#SignOutBtn").on("click", function (e) {
    e.preventDefault();
  });
  // SignedOut.style.visibility="hidden";
  // login_link.style.visibility="visible";
  
  
  console.log("SignOut for " + member.email + " successful");
  chrome.runtime.sendMessage(member);
};
SignedOut.addEventListener("click", SignOut);

let productSubmit = function () {
  let product = new Object();
  product.type = "product";
  product.url = document.getElementById("url").value;
  product.minPrice = document.getElementById("minPrice").value;
  $("#productLink").on("click", function (e) {
    e.preventDefault();
  });
  chrome.runtime.sendMessage(product);
  console.log("product request recieved");
};
ProductSubmit.addEventListener("click", productSubmit);



amazonextension.controller("MainCtrl", function () {});






