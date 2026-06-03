import { Stack } from 'expo-router';
import { DataProvider } from '../src/contexts/DataContext';

export default function RootLayout() {
  return (
    // Envolvemos a navegação inteira com o nosso provedor de dados
    <DataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </DataProvider>
  );
}