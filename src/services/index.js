import { onNavigate } from "../utils/history.js";

export const SignUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    /*.then((cred) => {
        return firebase.firestore().collection('users').doc(cred.user.uid).set({
            name: name,
        });
    })*/
    .then(() => {
        alert("Congrats! Now, tell us about you!");
        onNavigate("/profile");
    })
    .catch((error) => {
        alert("Ooops, something went wrong!")
        console.log(error.code);
        console.log(error.message);
    })
};

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