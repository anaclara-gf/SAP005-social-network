import { onNavigate } from "../utils/history.js";

export const SignUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        const user =firebase.auth().currentUser;
        user.sendEmailVerification()
        .then(() => {
            alert('Email sent. Please check your inbox.')
        });
        alert("Congrats! Now, tell us about you!");
        onNavigate("/profile");
    })
    .catch((error) => {
        if(error.code === "auth/email-already-in-use"){
            alert("There is already an account with this e-mail!")
        }else{
            alert("Ooops, something went wrong!")
            console.log(error.code);
            console.log(error.message);
        }
    })
}

export const SignOut = () => {
    auth.signOut();
}

export const searchUsername = (username) => { 
    let usersRef = firebase.firestore().collection('users');
    return usersRef.where('username', '==', username).get();
}

export const InfoProfile = (name, username, bio, favGenres) => {
    const user = String(firebase.auth().currentUser.uid);
    firebase.firestore().collection('users').doc(user).set({
        name: name,
        username: username,
        bio: bio,
        favGenres: favGenres
    })   
    .then(() => {
        alert("Welcome to 'Should I Watch?'");
        onNavigate("/home");
    })
};


// export const verifyUser = () => {
//    // const uid = null;
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//           // User is signed in.
//           console.log("hello there");
//         } else {
//           // No user is signed in.
//         //  uid = null;
//           onNavigate("/")
//           console.log("general kenobi");
//         }
//       });
// } 

export const SignIn = (email, password) => {
    console.log("hey");
   return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in
    // ...
    onNavigate("/home")
    alert("Welcome to 'Should I Watch?'");

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Error "+ errorMessage);
  });
};
