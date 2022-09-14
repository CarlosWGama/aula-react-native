import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home';
import { TarefaScreen } from '../screens/tarefa';

export type TarefaNavegacaoParams = {
    home: undefined,
    tarefa: {tarefa?: any}
}

const Stack = createStackNavigator<TarefaNavegacaoParams>();

export const TarefaNavegacao = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="tarefa" component={TarefaScreen} />
    </Stack.Navigator>
)
