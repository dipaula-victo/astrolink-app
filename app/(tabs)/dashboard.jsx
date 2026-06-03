import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AlertCard from '../../src/components/AlertCard';
import { useData } from '../../src/contexts/DataContext';
import { useRouter } from 'expo-router';
import { COLORS } from '../../src/constants/theme';


export default function DashboardScreen() {
  const { alerts } = useData();
  const router = useRouter(); // Inicializa o roteador

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <Text style={styles.sectionTitle}>Resumo Orbital (24h)</Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>[Prévia GEE - Sentinel 2]</Text>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/add-area')}
      >
        <Text style={styles.addButtonText}>+ Mapear Nova Área</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Alertas Inteligentes</Text>
      
      {alerts.map((alert) => (
        <AlertCard 
          key={alert.id} 
          title={alert.title} 
          badgeText={alert.badgeText} 
          description={alert.description} 
          type={alert.type}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 15, marginTop: 10 },
  mapPlaceholder: { height: 150, backgroundColor: '#c7d8eb', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  mapText: { color: COLORS.primary, fontWeight: 'bold' },
  addButton: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  addButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
});