import { Stack } from 'expo-router';
import { DataProvider } from '../src/contexts/DataContext';

export default function RootLayout() {
  return (
    <DataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="add-area" 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            title: 'Configurar Região',
            headerStyle: { backgroundColor: '#0b3d91' },
            headerTintColor: '#fff',
            headerLeft: () => null,
          }} 
        />
      </Stack>
    </DataProvider>
  );
}