import * as React from 'react';
import { View, Text, Button, FlatList, Alert, ToastAndroid } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { TarefaNavegacaoParams } from '../../navigation/tarefa';
import { Toolbar } from '../../components/toolbar';
import { FAB } from '@rneui/base';
import { ItemTarefa } from './item-tarefa';
import { Tarefa } from '../../model/tarefa';
import api from '../../providers/api';

export interface HomeScreenProps {
    route: RouteProp<TarefaNavegacaoParams, "home">
}

export function HomeScreen (props: HomeScreenProps) {

    //Constantes
    type navProp = StackNavigationProp<TarefaNavegacaoParams, 'home'>;
    const nav = useNavigation<navProp>();

    const [ tarefas, setTarefas ] = React.useState<Tarefa[]>([
      {id: "1", descricao: "Tarefa 1", data: "01/01/2019"},
      {id: "2", descricao: "Tarefa 2", data: "01/01/2020"},
      {id: "3", descricao: "Tarefa 3", data: "01/01/2021"},
      {id: "4", descricao: "Tarefa 4", data: "01/01/2022"},
    ])

    //Funções
    React.useEffect(() => {
        //Adiciona o listener uam unica vez ao carregar a tela
        nav.addListener('focus', () => {
            api.get('/tarefas').then(response => setTarefas(response.data))
        });
    }, [])


    //Funções
    const excluir = (id:any) => {
      Alert.alert("Excluir Tarefa", "Deseja realmente excluir essa tarefa?", [
         {text: 'Sim', onPress: async () => {
              await api.delete(`/tarefas/${id}`)
              await api.get('/tarefas').then(response => setTarefas(response.data))
              ToastAndroid.show('Tarefa excluida', ToastAndroid.LONG)
         }},
         {text: 'Não'}
      ])
    }


    ///Renderizando
    return (
      <View style={{flex:1}}>
          <Toolbar titulo="Home" menu />


            {/* LISTA DE TAREFAS */}
            <FlatList
              data={tarefas}
              extraData={tarefas}
              keyExtractor={(t) => String(t.id)}
              renderItem={({item}) => (
                <ItemTarefa 
                tarefa={item} 
                onEditar={(tarefa) => nav.navigate('tarefa', {tarefa})}
                onExcluir={excluir}/> 
                )} />          
              <FAB 
                icon={{name:'add', color:'white'}}
                color='#2089dc'
                placement='right'
                onPress={() => nav.navigate("tarefa", {})}/>
      </View>
    );
}
