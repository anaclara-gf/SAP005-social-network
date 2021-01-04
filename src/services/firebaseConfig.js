const firebaseConfig = {
  apiKey: "AIzaSyA2t1S0fAMMcmMKlrgvySHIETfxDgwsTC4",
  authDomain: "rede-social-329c5.firebaseapp.com",
  projectId: "rede-social-329c5",
  storageBucket: "rede-social-329c5.appspot.com",
  messagingSenderId: "380478275045",
  appId: "1:380478275045:web:236a15ee4af6c4392ac30c",
  measurementId: "G-LQNR916SGW"
};

firebase.initializeApp(firebaseConfig);
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '<./pages/home/index.js>',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     // firebase.auth.GithubAuthProvider.PROVIDER_ID,
//      firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     // firebase.auth.PhoneAuthProvider.PROVIDER_ID
//   ],
//   // Terms of service url.
//   tosUrl: '<./pages/home/index.js>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>'
// };
// ui.start('#firebaseui-auth-container', uiConfig);