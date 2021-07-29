import firebase from 'firebase/app'
import { ref, Ref } from 'vue';

const subscription = ref();
const currentUser: Ref<firebase.User | null | undefined> = ref();
const isAuthenticating = ref(true);
const isSignedIn = ref(false);

export const useAuth = () => {
  const subscribe = () => {
    subscription.value = firebase.auth().onAuthStateChanged(user => {
      currentUser.value = user;
      isAuthenticating.value = false;
      isSignedIn.value = !!user;
    });
  }

  const signOut = () => {
    return firebase.auth().signOut();
  }

  return {
    currentUser,
    isAuthenticating,
    isSignedIn,
    subscribe,
    signOut,
  }
}