import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { v4 as uuidv4 } from 'uuid';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signINWithGoogle = async () => {
    try {
        const userCred = await signInWithPopup(auth, googleProvider);
        console.log(userCred.user);
        window.location.reload();
    } catch (error) {
        console.error("Error signing in with Google: ", error);
    }
};

export const signINWithGitHub = async () => {
    try {
        const userCred = await signInWithPopup(auth, githubProvider);
        console.log(userCred.user);
        window.location.reload();
    } catch (error) {
        console.error("Error signing in with GitHub: ", error);
    }
};

export const Menus = [
    { id: uuidv4(), name: "Projects", uri: "/home/projects" },
    { id: uuidv4(), name: "Feedback", uri: "/home/Feedback" },
    { id: uuidv4(), name: "Profile", uri: "/home/profile" },
];

export const signOutAction = async () => {
    try {
        await auth.signOut();
        window.location.reload();
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};
