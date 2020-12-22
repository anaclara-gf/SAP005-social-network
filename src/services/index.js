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
