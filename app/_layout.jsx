import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Esconde o cabeçalho padrão para o grupo de abas */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}