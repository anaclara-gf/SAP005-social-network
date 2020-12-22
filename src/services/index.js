import { onNavigate } from "../utils/history.js";

// export const SignUp = (email, password, name, username) => firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((res) => {
    // const user = firebase.auth().currentUser;
    // user.sendEmailVerification().then(() => {
    //   alert('Email sent. Please check your inbox.');
    //   // Email sent.
    // }).catch((error) => {
    //   alert('Ooops, something went wrong!');
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode);
    //   console.log(errorMessage);
    //   // An error happened.
    // });
//     // user.sendEmailVerification()
//     //   .then(() => {
//     //     if (!firebase.auth().currentUser.emailVerified) {
//     //       return alert('Invalid email');
//     //     }
//     //     alert('Email sent! Please check your inbox');
//     //   })
//     //   .catch((error) => {
//     //     alert('Ooops, something went wrong!');
//     //     const errorCode = error.code;
//     //     const errorMessage = error.message;
//     //     console.log(errorCode);
//     //     console.log(errorMessage);
//     //   });
//     return user.updateProfile({
//       displayName: name,
//       uid: username,
//     });
//   })
//   .catch((error) => {
//     alert('Ooops, something went wrong!');
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode);
//     console.log(errorMessage);
//   });

export const SignUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
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
