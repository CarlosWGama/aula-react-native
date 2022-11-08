import { StatusBar } from 'expo-status-bar';
import { NavegacaoPrincipal } from './src/navigation';
import { AutenticacaoProvider } from './src/providers/autenticacao';


export default function App() {
  return (
    <>
      <AutenticacaoProvider>
        <NavegacaoPrincipal/>
      </AutenticacaoProvider>
      <StatusBar translucent={true} style="light" backgroundColor='transparent' />
    </>
  );
}
