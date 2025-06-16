// App.js
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import GerenciarAssinatura from './screens/GerenciarAssinatura';
import TelaInicial from './screens/TelaInicial';
import ListaCompleta from './screens/ListaCompleta';
import IconButton from './components/IconButton';
import AuthProvider from './src/auth-contexto';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <IconButton
            icon="add"
            size={24}
            onPress={() => {
              navigation.navigate('GerenciarAssinatura');
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
          title: 'Resumo de Assinaturas',
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <Tab.Screen
        name="ListaCompleta"
        component={ListaCompleta}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Todas',
          title: 'Todas as Assinaturas',
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="ResumoAssinaturas"
            component={BottomTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarAssinatura"
            component={GerenciarAssinatura}
            // A tela de gerenciar terá um título dinâmico (Adicionar/Editar)
            // que será setado dentro do próprio componente.
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});