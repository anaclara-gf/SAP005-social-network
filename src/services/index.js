export const signUp = (email, password) => {
    return  firebase.auth().createUserWithEmailAndPassword(email, password)    
};

// export const UserStatus = () => {
//     firebase.auth().onAuthStateChanged(user => {
//         console.log(user)
//     })
// }

export const verifyEmail = () => { 
    return firebase.auth().currentUser.sendEmailVerification()
};

export const signOut = () => {
    return firebase.auth().signOut()
};

export const UserInfoUid = () => {
    let uid;
    let user = firebase.auth().currentUser;
    if(user !== null){
        uid = user.uid;
        return uid;
    }
}

export const searchUsername = (username) => { 
    let usersRef = firebase.firestore().collection('users');
    return usersRef.where('username', '==', username).get();
};

export const InfoProfile = (name, username, bio, favGenres) => {
    firebase.firestore().collection('users').doc(UserInfoUid()).set({
        name: name,
        username: username,
        bio: bio,
        favGenres: favGenres
    })   
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
    return firebase.firestore().collection('reviews').get();
}

export const UserProfileInfo = (userUid) => {
    return firebase.firestore().collection('users').doc(userUid).get();
}

export const ReviewPost = (postId) => {
    return firebase.firestore().collection('reviews').doc(postId);
}