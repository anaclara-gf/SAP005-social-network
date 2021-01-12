export const signUp = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
};

export const verifyEmail = () => {
    return firebase.auth().currentUser.sendEmailVerification()
};

export const verifyUser = () => {
    return firebase.firestore().collection('users').where("email", "==", firebase.auth().currentUser.email).get()
};

export const InfoProfileEmail = () => {
    firebase.firestore().collection('users').doc(UserInfoUid()).set({
        email: firebase.auth().currentUser.email
    })
};

export const UserInfoUid = () => {
    return firebase.auth().currentUser.uid;
};

export const InfoProfile = (name, username, bio, favGenres) => {
    return firebase.firestore().collection('users').doc(UserInfoUid()).update({
        name: name,
        username: username,
        bio: bio,
        favGenres: favGenres
    })
};

export const searchUsername = (username) => {
    const usersRef = firebase.firestore().collection('users');
    return usersRef.where('username', '==', username).get();
};

export const SignIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
};

export const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
};

/*export const stayLogged = () => {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
 };*/

export const signOut = () => {
    return firebase.auth().signOut()
};

export const UserProfileInfo = () => {
    return firebase.firestore().collection('users').doc(UserInfoUid()).get()
};

export const Review = (movieName, review, platform, rating, doc) => {
    const data = new Date();
    return firebase.firestore().collection('reviews').doc().set({
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
        agree: [],
        disagree: [],
    })
};

export const ReviewsData = () => {
    return firebase.firestore().collection('reviews').orderBy('data', 'desc').orderBy('time', 'desc').get();
};

export const ReviewPost = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId);
};

export const AgreePostClick = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId).update({
        agree: firebase.firestore.FieldValue.arrayUnion(UserInfoUid())
    })
};

export const AgreePostClickOut = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId).update({
        agree: firebase.firestore.FieldValue.arrayRemove(UserInfoUid())
    })
};

export const DisagreePostClick = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId).update({
        disagree: firebase.firestore.FieldValue.arrayUnion(UserInfoUid())
    })
};

export const DisagreePostClickOut = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId).update({
        disagree: firebase.firestore.FieldValue.arrayRemove(UserInfoUid())
    })
};
