import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../src/components/Header';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0b3d91', // Azul NASA
        tabBarInactiveTintColor: '#777777',
        // Ativamos o header e passamos o nosso componente customizado
        headerShown: true, 
        header: () => <Header />,
        
        // Correção das labels cortadas
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          minHeight: 65, // Usamos minHeight em vez de height fixo
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        }
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Relatórios',
          tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}