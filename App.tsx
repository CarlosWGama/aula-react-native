import { StatusBar } from 'expo-status-bar';
import { NavegacaoPrincipal } from './src/navigation';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './src/config/firebase-config';

export default function App() {
  initializeApp(firebaseConfig);

  return (
    <>
      <NavegacaoPrincipal />
      <StatusBar translucent={true} style="light" backgroundColor='transparent' />
    </>
  );
}
