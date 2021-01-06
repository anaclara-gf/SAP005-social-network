export const signUp = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
};

// export const UserStatus = () => {
//     firebase.auth().onAuthStateChanged(user => {
//         console.log(user)
//     })
// 

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
    let uid;
    let user = firebase.auth().currentUser;
    if (user !== null) {
        uid = user.uid;
        return uid;
    }
};

export const searchUsername = (username) => {
    let usersRef = firebase.firestore().collection('users');
    return usersRef.where('username', '==', username).get();
};

export const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
};

export const SignIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
};

export const Review = (movieName, review, plataform, rating) => {
    firebase.firestore().collection('users').doc(UserInfoUid()).get()
        .then(doc => {
            firebase.firestore().collection('reviews').doc().set({
                userUid: UserInfoUid(),
                name: doc.data().name,
                username: doc.data().username,
                movieName: movieName,
                review: review,
                plataform: plataform,
                rating: rating,
                agree: 0,
                disagree: 0,
            })
        })
        .then(() => {
            onNavigate("/timeline");
        })
};

export const ReviewsData = () => {
    return firebase.firestore().collection('reviews').get()
};

export const UserProfileInfo = (userUid) => {
    return firebase.firestore().collection('users').doc(userUid).get()
};

export const ReviewPost = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId);
};

export const AgreePost = (postId) => {
    const postLike = firebase.firestore().collection("post").doc(postId);
    postLike.update({
      agree: firebase.firestore.FieldValue.increment(1)
    })
};

export const DisagreePost = (postId) => {
    const postLike = firebase.firestore().collection("post").doc(postId);
    postLike.update({
      disagree: firebase.firestore.FieldValue.increment(1)
    })
};

