import { createApp } from 'vue'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import App from './views/App.vue'
import { firebaseConfig } from './firebase.config';
import router from './router';
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
