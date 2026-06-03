import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AlertCard from '../../src/components/AlertCard';
import { useData } from '../../src/contexts/DataContext';

export default function DashboardScreen() {
  // Consumindo os alertas do nosso Contexto Global
  const { alerts } = useData();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <Text style={styles.sectionTitle}>Resumo Orbital (24h)</Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>[Prévia GEE - Sentinel 2]</Text>
      </View>

      <Text style={styles.sectionTitle}>Alertas Inteligentes</Text>
      
      {/* Percorre a lista de alertas do Contexto e renderiza um Card para cada um */}
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
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 15, marginTop: 10 },
  mapPlaceholder: { height: 150, backgroundColor: '#c7d8eb', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  mapText: { color: '#0b3d91', fontWeight: 'bold' }
});