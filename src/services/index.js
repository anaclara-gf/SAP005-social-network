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
