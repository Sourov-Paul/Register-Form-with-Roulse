import { initializeApp } from "firebase/app";
import firebaseConfig from './firbase.config';

const initilizeAuthentication=()=>{
initializeApp(firebaseConfig);

}
export default initilizeAuthentication