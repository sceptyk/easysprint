import firebase from 'firebase/app'
import { ref, Ref } from 'vue';

export const useAuth = () => {
  let subscription = ref();
  let currentUser: Ref<firebase.User | null | undefined> = ref(undefined);
  let isAuthenticating = ref(true);
  let isSignedIn = ref(false);

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