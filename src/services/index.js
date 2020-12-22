import { onNavigate } from "../utils/history.js";

export const SignUp = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            const user = String(firebase.auth().currentUser.uid);
            firebase.firestore().collection('users').doc(user).set({
                email: user.email,
                uid: user.uid
            })
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

export const signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            onNavigate("/home")
        })
        .catch((error) => {
            alert("Ooops, something went wrong!")
            console.log(error.code);
            console.log(error.message);
        })
};

export const signOut = (email, password) => {
    return firebase.auth().signOut()
        .then(() => {
            onNavigate("/");
        })
        .catch((error) => {
            alert("Ooops, something went wrong!")
            console.log(error.code);
            console.log(error.message);
        })
};

export const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider)
        .then(() => {
            oi();
        })
        .catch((error) => {
            alert("Ooops, something went wrong!")
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
        })
};

export const oi = () => {
    firebase.firestore().collection('users').where("email", "===", user.email).get()
        .then((result) => {
            if (result.size < 1) {
                const user = String(firebase.auth().currentUser.uid);
                firebase.firestore().collection('users').doc(user).set({
                    email: user.email,
                    uid: user.uid
                })
                onNavigate("/profile")
            } else {
                onNavigate("/home")
            }
        })
        .catch((error) => {
            alert("Ooops, something went wrong!")
            console.log(error.code);
            console.log(error.message);
        })
}