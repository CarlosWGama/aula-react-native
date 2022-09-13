import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavegacaoPrincipalParams } from '../../navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { TarefaNavegacaoParams } from '../../navigation/tarefa';
import { StackNavigationProp } from '@react-navigation/stack';


export interface HomeScreenProps {
    route: RouteProp<TarefaNavegacaoParams, "home">
}

export function HomeScreen (props: HomeScreenProps) {

    //Constantes
    type navProp = StackNavigationProp<TarefaNavegacaoParams, 'home'>;
    const nav = useNavigation<navProp>();

    ///Renderizando
    return (
      <View>
         <Text>HomeScreen</Text>
         
         <Button title="Tela de Tarefas" onPress={() => nav.navigate("tarefa",{tarefa: {id:1}})} />
      </View>
    );
}
