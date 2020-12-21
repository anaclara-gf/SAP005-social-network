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
export const SignUp = (email, password, name, username, bio, favGenres) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((cred) => {
        return firebase.firestore().collection('users').doc(cred.user.uid).set({
            name: name,
            username: username,
            bio: bio,
            favGenres: favGenres
        });
    })
    .then(() => {
        alert("Welcome to 'Should I Watch?'")
    })
    .catch((error) => {
        alert("Ooops, something went wrong!")
        console.log(error.code);
        console.log(error.message);
    })
}
