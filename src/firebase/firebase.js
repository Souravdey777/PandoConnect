import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// import firebase from  "firebase"
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.app = app;
        this.auth = app.auth();
        this.db = app.firestore();
        this.storageRef = app.storage().ref();
        this.imagesRef = this.storageRef.child('images');
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(
            email,
            password
        );
        return newUser.user.updateProfile({
            displayName: name,
        });
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    logout() {
        return this.auth.signOut();
    }

    resetPassword(email) {
        return this.auth.sendPasswordResetEmail(email);
    }

    async uploadPicture(file) {
        await this.imagesRef.child(file.name).put(file);
        return this.imagesRef.child(file.name).getDownloadURL();
    }
}

const firebase = new Firebase();
export default firebase;
