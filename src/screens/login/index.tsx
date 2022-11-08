
import { View, Text, ImageBackground, StyleSheet, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import bg from './../../assets/imgs/bg.png';
import { useRef, useState } from 'react';
import { InputRound } from './input';
import { Button, Input } from '@rneui/base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { Modalize } from 'react-native-modalize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../providers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginScreenProps {
}

export function LoginScreen(props: LoginScreenProps) {

    //Constantes
    type navProps = StackNavigationProp<NavegacaoPrincipalParams, 'login'>
    const nav = useNavigation<navProps>();
    const modal = useRef<Modalize>();
    const [ erro, setErro ] = useState<null|string>(null);

    //Funções
    const logar = async (dados) => {
      console.log(dados)  
      
      await api.post('/login', dados)
            .then(response => {
                AsyncStorage.setItem('jwt', response.data.jwt);
                nav.navigate('app')
            })
            .catch(() => ToastAndroid.show("Email ou senha incorreta", 3000));
    }

    const cadastrar = async (usuario) => {
      console.log(usuario)
      
      await api.post('/usuarios', {usuario})
      //retornou código de sucesso 201
      .then(() => ToastAndroid.show('Cadastrado com sucesso', ToastAndroid.LONG))
      //retornou código de erro 30x/40x/50x
      .catch(() => ToastAndroid.show('Falha ao cadastrar usuário', ToastAndroid.LONG));

      modal.current?.close();
    }

    return (
        <ImageBackground source={bg} style={styles.background}>
          <Formik 
              initialValues={{email:'', senha:''}}
              validationSchema={Yup.object({
                email: Yup.string().required('Informe o email').email('Não é um formato de e-mail válido'),
                senha: Yup.string().required('Informe a senha').min(6, 'A senha precisa de 6 caracteres')
              })}
              onSubmit={logar}>
              {({errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting}) => (
                    <View style={styles.container}>
                        <Text style={styles.logo}>APP</Text>

                        {/* EMAIL  */}
                        <InputRound placeholder='Digite seu email' icone='person' onChangeText={handleChange('email')} onBlur={handleBlur('email')} />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                        {/* SENHA */}
                        <InputRound placeholder='Digite sua senha' icone='lock' senha  onChangeText={handleChange('senha')} onBlur={handleBlur('senha')}/>
                        {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}

                        {erro && <Text style={styles.erroLogin}>{erro}</Text>}

                        {isSubmitting && <ActivityIndicator size="large" color="blue" />}
                        {!isSubmitting && <Button title="Logar" onPress={() => handleSubmit()} containerStyle={styles.btn} />}

                        <TouchableOpacity onPress={() => modal.current?.open()}>
                          <Text style={styles.cadastrar}>Não possui conta? Clique aqui para se cadastrar</Text>
                        </TouchableOpacity>
                    </View>
              )}
          </Formik>

          {/* modalHeight define a altura que o modal abre e modalStyle aplica um estilo ao modal */}
          <Modalize ref={modal}
                modalStyle={{padding: 20}}
                modalHeight={400}  
            >
                <Formik
                    initialValues={{email:'', senha:''}}
                    onSubmit={cadastrar}
                >
                    {({handleChange, handleSubmit}) => (
                        <>
                            <Input onChangeText={handleChange('email')} placeholder='Digite seu email' keyboardType='email-address' />
                            <Input onChangeText={handleChange('nome')} placeholder='Digite seu nome'  />
                            <Input onChangeText={handleChange('senha')} placeholder='Digite sua senha' secureTextEntry />
                            <Button type='clear' onPress={() => handleSubmit()} title="Cadastrar" />
                        </>
                        )}
                </Formik>
          </Modalize>
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
      error:{color:'white', fontSize: 15, textAlign:'right', marginBottom: 5, marginTop: -10},
      erroLogin:{color:'white', fontSize: 20, marginBottom: 5, textAlign:'center'},
      btn: {borderRadius:30, marginTop: 10, marginHorizontal: 10},
      logo: { color: 'white', fontSize: 50, textAlign: 'center'}
});
  
