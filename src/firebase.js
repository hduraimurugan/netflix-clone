import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";



const firebaseConfig = {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    authDomain: "netflix-clone-39a8c.firebaseapp.com",
    projectId: "netflix-clone-39a8c",
    storageBucket: "netflix-clone-39a8c.appspot.com",
    messagingSenderId: "699191091475",
    appId: "1:699191091475:web:785ab5714bb91d1ec7fae6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    }
    catch (error) {
        console.log(error);
        toast.warning(error.code.split('/')[1]);
    }
};

const login = async (email, password) => {
    try {
          await signInWithEmailAndPassword(auth, email, password);
          toast.success("Logged In Successfully")
    }
    catch (error) {
        console.log(error);
        toast.warning(error.code.split('/')[1]);
    }
};

const logout = () => {
    auth.signOut(auth);
    toast.error("Logged out")
};

export {
    auth,
    db,
    signup,
    login,
    logout
};