export const SignUp = (email, password, name, username) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
        const user = firebase.auth().currentUser;
        return user.updateProfile({
            displayName: name,
            uid: username
        })
    })
    .catch((error) => {
        alert("Ooops, something went wrong!")
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    })
}
