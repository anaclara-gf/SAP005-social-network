export const signUp = (email, password) => {
    return  firebase.auth().createUserWithEmailAndPassword(email, password)    
};

export const verifyEmail = (user) => { 
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
    let user = String(firebase.auth().currentUser.uid);
    firebase.firestore().collection('users').doc(user).set({
        name: name,
        username: username,
        bio: bio,
        favGenres: favGenres
    })   
};

export const signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
};

export const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider)
};

