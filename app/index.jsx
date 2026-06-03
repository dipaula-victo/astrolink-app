import { Redirect } from 'expo-router';

export default function Index() {
  // Redireciona o usuário imediatamente para a rota do dashboard
  return <Redirect href="/(tabs)/dashboard" />;
}