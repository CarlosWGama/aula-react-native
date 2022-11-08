import * as React from 'react';
import { View, Text, Button, FlatList, Alert, LogBox } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { TarefaNavegacaoParams } from '../../navigation/tarefa';
import { Toolbar } from '../../components/toolbar';
import { FAB } from '@rneui/base';
import { ItemTarefa } from './item-tarefa';
import { Tarefa } from '../../model/tarefa';
import { getFirestore, where, collection, deleteDoc, query, getDocs, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export interface HomeScreenProps {
    route: RouteProp<TarefaNavegacaoParams, "home">
}

export function HomeScreen (props: HomeScreenProps) {

    //Constantes
    type navProp = StackNavigationProp<TarefaNavegacaoParams, 'home'>;
    const nav = useNavigation<navProp>();
    const [ tarefas, setTarefas ] = React.useState<Tarefa[]>([])
    const auth = getAuth();
    const db = getFirestore();

    React.useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer'])
        nav.addListener('focus', () => {
            const q = query(collection(db, 'tarefas'), where('usuarioID', '==', auth.currentUser?.uid));

            getDocs(q)
                .then(snapshots => {
                    const resultados: any[] = []
                    snapshots.forEach(snapshot => {
                        resultados.push(snapshot.data());
                    })
                    setTarefas(resultados);
                })
        })
    }, [])

    //Funções
    const excluir = (id:any) => {
        Alert.alert("Excluir Tarefa", "Deseja realmente excluir essa tarefa?", [
           {text: 'Sim', onPress: async () => {
              console.log('Excluindo item');

              await deleteDoc(doc(db, 'tarefas', id));

              const q = query(collection(db, 'tarefas'), where('usuarioID', '==', auth.currentUser?.uid));
              getDocs(q)
                .then(snapshots => {
                    const resultados: any[] = []
                    snapshots.forEach(snapshot => {
                        resultados.push(snapshot.data());
                    })
                    setTarefas(resultados);
              })
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
