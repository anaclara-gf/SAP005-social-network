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
