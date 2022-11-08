import { StatusBar } from 'expo-status-bar';
import { NavegacaoPrincipal } from './src/navigation';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './src/config/firebase-config';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  initializeApp(firebaseConfig);
  
  // add firebase config here
  
  // initialize firebase app
  const app = initializeApp(firebaseConfig);
  
  // initialize auth
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

  return (
    <>
      <NavegacaoPrincipal />
      <StatusBar translucent={true} style="light" backgroundColor='transparent' />
    </>
  );
}
