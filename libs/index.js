
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
export let auth = {}
export const init = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBLDC5NW0O7mIpevf30baspp8vGo1ehYws",
    authDomain: "spokenote-v2.firebaseapp.com",
    projectId: "spokenote-v2",
    storageBucket: "spokenote-v2.appspot.com",
    messagingSenderId: "136331184210",
    appId: "1:136331184210:web:dfce161c8f9126de85f78b"
  }
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyCFAZc_8-vGl6UYQQh2sS0AEfmS4KAkwMw',
  //   authDomain: 'spokenote-itv.firebaseapp.com',
  //   projectId: 'spokenote-itv',
  //   storageBucket: 'spokenote-itv.appspot.com',
  //   messagingSenderId: '272094783012',
  //   appId: '1:272094783012:web:39a6b882137f82d5c11ab1'
  // }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  auth.useDeviceLanguage()
}