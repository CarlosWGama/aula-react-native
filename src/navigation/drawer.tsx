import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'
import { TarefaNavegacao } from './tarefa';
import { View, Text } from 'react-native';
import { Button } from '@rneui/base';
import { NavegacaoConfiguracao } from './configuracoes';
import { useAutenticacaoContext } from '../providers/autenticacao';

const Drawer = createDrawerNavigator();

export const NavegacaoDrawer = () => {
    const { usuario } = useAutenticacaoContext();
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={(props) => (
            <View>
                <Text style={{paddingLeft: 10, paddingTop: 20}}>Bem Vindo - {usuario}</Text>
                <DrawerItemList {...props}/>
                <Button type="clear" title="Sair"  onPress={() => props.navigation.navigate('login')} />
            </View>
        )}>
            <Drawer.Screen name="tarefas" component={TarefaNavegacao} options={{drawerLabel:"Tarefas", drawerIcon: () => <MaterialIcons name="done" /> }} />
            <Drawer.Screen name="opcoes" component={NavegacaoConfiguracao} options={{drawerLabel: 'Configurações', drawerIcon: () => <MaterialIcons name="settings" />}}  />
        </Drawer.Navigator>
    )
}