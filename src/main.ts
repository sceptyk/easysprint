import { createApp } from 'vue'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import App from './views/App.vue'
import { firebaseConfig } from './firebase.config';
import router from './router';
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
