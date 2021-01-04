export const signUp = (email, password) => {
    return  firebase.auth().createUserWithEmailAndPassword(email, password)    
};

export const verifyEmail = () => { 
    return firebase.auth().currentUser.sendEmailVerification()
};

export const signOut = () => {
    return firebase.auth().signOut()
};

export const searchUsername = (username) => { 
    let usersRef = firebase.firestore().collection('users');
    return usersRef.where('username', '==', username).get();
};

export const infoProfile = (name, username, bio, favGenres) => {
    const user = String(firebase.auth().currentUser.uid);
    firebase.firestore().collection('users').doc(user).set({
        name: name,
        username: username,
        bio: bio,
        favGenres: favGenres
    })   
};

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
