import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { TarefaNavegacaoParams } from '../../navigation/tarefa';
import { Toolbar } from '../../components/toolbar';
import { FAB } from '@rneui/base';

export interface HomeScreenProps {
    route: RouteProp<TarefaNavegacaoParams, "home">
}

export function HomeScreen (props: HomeScreenProps) {

    //Constantes
    type navProp = StackNavigationProp<TarefaNavegacaoParams, 'home'>;
    const nav = useNavigation<navProp>();

    ///Renderizando
    return (
      <View style={{flex:1}}>
          <Toolbar titulo="Home" menu />
          
          <FAB 
            icon={{name:'add', color:'white'}}
            color='#2089dc'
            placement='right'
            onPress={() => nav.navigate("tarefa", {})}/>
          
      </View>
    );
}
