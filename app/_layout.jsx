import { Stack } from 'expo-router';
import { DataProvider } from '../src/contexts/DataContext';
import { COLORS } from '../src/constants/theme';

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
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: COLORS.white,
            headerLeft: () => null,
          }} 
        />
      </Stack>
    </DataProvider>
  );
}