import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import GerenciarDespesa from './screens/GerenciarDespesa';
import DespesaRecentes from './screens/DespesaRecentes';
import TodasDespesas from './screens/TodasDespesas';
import {Ionicons} from '@expo/vector-icons';
import IconButton from './components/IconButton';
import AuthProvider from './src/auth-contexto';

export default function App() {

const Tab = createBottomTabNavigator();

function BottonTabScreen(){
  return(
    <Tab.Navigator
    screenOptions={({navigation}) => (
      
      {headerRight: () => <IconButton icon="add" size={24} onPress={() => {
        navigation.navigate('GerenciarDespesa');
      }} />}
      
      )
    }>
      
      
      <Tab.Screen name="DespesaRecentes" component={DespesaRecentes} 
      options={{tabBarIcon: ({color, size}) => (
        <Ionicons name="hourglass" size={size} color={color} />
      ),
      tabBarLabel: 'Home',
      title: 'Tela Inicial',
      tabBarLabelStyle: { fontSize: 12 },
      }}/>
      <Tab.Screen name="TodasDespesas" component={TodasDespesas} 
      options={{tabBarIcon: ({color, size}) => (
      <Ionicons name="wallet-outline" size={size} color={color} />
      ),
      tabBarLabel: 'Gasto Total',
      title: 'Soma de todos os Gastos',
      tabBarLabelStyle: { fontSize: 12 }
      
      }}/>
    </Tab.Navigator>
  )}

const Stack = createNativeStackNavigator();
  return (
  <NavigationContainer>
    <AuthProvider>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottonTabScreen} 
            options={{headerShown:false}}/>
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
    );}

const styles = StyleSheet.create({ container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
