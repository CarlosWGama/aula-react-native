
import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import bg from './../../assets/imgs/bg.png';
import { useCallback, useState } from 'react';
import { InputRound } from './input';
import { Button } from '@rneui/base';

export interface LoginScreenProps {
}

export function LoginScreen(props: LoginScreenProps) {

    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');

    const logar = () => {
      if (email.trim() == 'teste@teste.com' && senha == '123456')
        console.log('Logado com sucesso');
      else
        console.log('Email ou senha incorreta!');
    }

    return (
        <ImageBackground source={bg} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.logo}>APP</Text>
                
                {/* EMAIL */ }
                <InputRound texto='Email' placeholder='Digite seu email' icone='person' onChangeText={setEmail}/>
                
                {/* SENHA */}
                <InputRound  texto='Senha' placeholder='Digite sua senha' icone='lock'  onChangeText={setSenha} senha/>

                {/* BOTÃO */}
                <Button title='Logar' buttonStyle={styles.btn} onPress={logar}/>

                {/* OPÇÃO CADASTRAR */}
                <Text style={styles.cadastrar}>Não possui conta?
                  {'\n'}
                  Clique aqui para se cadastrar</Text>
            </View>
        </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
      cadastrar: {
        fontSize: 20,
        color: 'white',
        margin: 30,
        textAlign: 'center',
        textDecorationLine: 'underline'
      },
      background: {width:'100%', height:'100%'},
      container: {
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          alignItems: 'stretch'
      },
      
      btn: {borderRadius:30, marginTop: 10, marginHorizontal: 10},
      logo: { color: 'white', fontSize: 50, textAlign: 'center'}
});
  
