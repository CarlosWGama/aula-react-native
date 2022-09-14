import { StatusBar } from 'expo-status-bar';
import { NavegacaoPrincipal } from './src/navigation';


export default function App() {
  return (
    <>
      <NavegacaoPrincipal />
      <StatusBar translucent={true} style="light" backgroundColor='transparent' />
    </>
  );
}
