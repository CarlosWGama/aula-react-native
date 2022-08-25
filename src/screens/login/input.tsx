import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '@rneui/base';

export interface InputRoundProps {
    texto?:string;
    senha?:boolean;
    icone: string;
    placeholder: string;
    onChangeText?(text:string):void;
}

function _InputRound (props: InputRoundProps) {
    
    return (
      <View>
         { props.texto && <Text style={styles.texto}>{props.texto}</Text>}
         <Input 
                  placeholder={props.placeholder}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{color:'white'}}
                  onChangeText={props.onChangeText}
                  placeholderTextColor="lightgrey"
                  secureTextEntry={props.senha}
                  leftIcon={{name:props.icone, color:'white'}}
                />
      </View>
    );
}

export const InputRound = React.memo(_InputRound);

const styles = StyleSheet.create({
    texto: { fontSize: 20, color: 'white'},
    inputContainer:{
        backgroundColor:'rgba(255,255, 255, 0.3)',
        borderRadius: 30,
        paddingLeft: 10,
        marginBottom: -15
    }
});