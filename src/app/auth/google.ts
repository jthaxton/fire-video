import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider} from "../util/firebase"

export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Signed in user:", result.user);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };