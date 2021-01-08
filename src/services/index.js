export const signUp = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
};

export const verifyEmail = () => {
    return firebase.auth().currentUser.sendEmailVerification()
};

export const InfoProfileEmail = () => {
    firebase.firestore().collection('users').doc(UserInfoUid()).set({
        email: firebase.auth().currentUser.email
    })
};

export const verifyUser = () => {
    return firebase.firestore().collection('users').where("email", "==", firebase.auth().currentUser.email).get()
};

export const InfoProfile = (name, username, bio, favGenres) => {
    return firebase.firestore().collection('users').doc(UserInfoUid()).update({
        name: name,
        username: username,
        bio: bio,
        favGenres: favGenres
    })
};

export const signOut = () => {
    return firebase.auth().signOut()
};

export const UserInfoUid = () => {
    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user !== null) {
            let useruid = firebase.auth().currentUser;
            const uid = useruid.uid;
            return uid
        // }
    // })
};

export const searchUsername = (username) => {
    const usersRef = firebase.firestore().collection('users');
    return usersRef.where('username', '==', username).get();
};

// export const verifyStateUser = () => {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user !== null) {
            
//         }
//     })
// };

export const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
};

export const SignIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
};

export const Review = (movieName, review, platform, rating) => {
    const data = new Date();
    return firebase.firestore().collection('users').doc(UserInfoUid()).get()
        .then(doc => {
            firebase.firestore().collection('reviews').doc().set({
                userUid: UserInfoUid(),
                name: doc.data().name,
                username: doc.data().username,
                movieName: movieName,
                review: review,
                platform: platform,
                rating: rating,
                data: data.toLocaleDateString(),
                time: data.getTime(),
                dataString: `${data.toLocaleDateString()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`,
                agree: 0,
                disagree: 0,
            })
        })
};

export const ReviewsData = () => {
    return firebase.firestore().collection('reviews').orderBy('data', 'desc').orderBy('time', 'desc').get();
}

export const UserProfileInfo = (userUid) => {
    return firebase.firestore().collection('users').doc(userUid).get()
};

export const ReviewPost = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId);
};

export const AgreePostClick = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId).update({
        agree: firebase.firestore.FieldValue.increment(1)
    })
};

export const DisagreePostClick = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId).update({
        disagree: firebase.firestore.FieldValue.increment(1)
    })
};

export const DisagreePostClickOut = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId).update({
        disagree: firebase.firestore.FieldValue.increment(-1)
    })
};

export const AgreePostClickOut = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId).update({
        agree: firebase.firestore.FieldValue.increment(-1)
    })
};

export const stayLogged = () => {
   return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}