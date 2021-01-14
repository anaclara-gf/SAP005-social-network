export const signUp = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const verifyEmail = () => firebase.auth().currentUser
  .sendEmailVerification();

export const verifyUser = () => firebase.firestore().collection('users')
  .where('email', '==', firebase.auth().currentUser.email).get();

export const UserInfoUid = () => firebase.auth().currentUser.uid;

export const InfoProfileEmail = () => firebase.firestore().collection('users')
  .doc(UserInfoUid()).set({
    email: firebase.auth().currentUser.email,
  });

export const InfoProfile = (name, username, bio, favGenres) => firebase.firestore().collection('users').doc(UserInfoUid()).update({
  name,
  username,
  bio,
  favGenres,
});

export const searchUsername = (username) => firebase.firestore()
  .collection('users').where('username', '==', username).get();

export const SignIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signOut = () => firebase.auth().signOut();

export const UserProfileInfo = () => firebase.firestore()
  .collection('users').doc(UserInfoUid()).get();

export const Review = (movieName, review, platform, rating, doc) => {
  const data = new Date();
  return firebase.firestore().collection('reviews').doc().set({
    userUid: UserInfoUid(),
    name: doc.data().name,
    username: doc.data().username,
    movieName,
    review,
    platform,
    rating,
    data: data.toLocaleDateString(),
    time: data.getTime(),
    dataString: `${data.toLocaleDateString()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`,
    agree: [],
    disagree: [],
  });
};

export const ReviewsData = () => firebase.firestore().collection('reviews')
  .orderBy('data', 'desc').orderBy('time', 'desc')
  .get();

export const ReviewPost = (postId) => firebase.firestore()
  .collection('reviews').doc(postId);

export const AgreePostClick = (postId) => firebase.firestore()
  .collection('reviews').doc(postId).update({
    agree: firebase.firestore.FieldValue.arrayUnion(UserInfoUid()),
  });

export const AgreePostClickOut = (postId) => firebase.firestore()
  .collection('reviews').doc(postId).update({
    agree: firebase.firestore.FieldValue.arrayRemove(UserInfoUid()),
  });

export const DisagreePostClick = (postId) => firebase.firestore()
  .collection('reviews').doc(postId).update({
    disagree: firebase.firestore.FieldValue.arrayUnion(UserInfoUid()),
  });

export const DisagreePostClickOut = (postId) => firebase.firestore()
  .collection('reviews').doc(postId).update({
    disagree: firebase.firestore.FieldValue.arrayRemove(UserInfoUid()),
  });
