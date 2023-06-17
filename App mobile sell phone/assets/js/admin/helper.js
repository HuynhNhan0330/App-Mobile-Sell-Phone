export const firebaseConfig = {
    apiKey: "AIzaSyCNs4BXXqG99ZVunCBERIYsmuaTORrWpBg",
    authDomain: "appsellphone-768a3.firebaseapp.com",
    databaseURL: "https://appsellphone-768a3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "appsellphone-768a3",
    storageBucket: "appsellphone-768a3.appspot.com",
    messagingSenderId: "165764750489",
    appId: "1:165764750489:web:721367400bdc131573ec08",
    measurementId: "G-L7QJT0E79G"
};


export function restrictSpecialCharacters(input) {
    input.on("input", function () {
      const value = $(this).val();
      const regex = /^[a-zA-Z0-9\u00C0-\u024F\s]+$/;
  
      if (!regex.test(value)) {
        $(this).val(value.replace(/^[a-zA-Z0-9\u00C0-\u024F\s]+$/, "")); 
        
    }
    });
  }