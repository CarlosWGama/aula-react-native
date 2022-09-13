import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login';
import { NavegacaoDrawer } from './drawer';



export type NavegacaoPrincipalParams = {
    login: undefined,
    app: {email:string}
}

const Stack = createStackNavigator<NavegacaoPrincipalParams>();


export const NavegacaoPrincipal = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginScreen}/>
            <Stack.Screen name="app" component={NavegacaoDrawer} />
        </Stack.Navigator>
    </NavigationContainer>
)