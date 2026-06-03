import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AlertCard from '../../src/components/AlertCard';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Placeholder para o Mapa Resumo que faremos depois */}
      <Text style={styles.sectionTitle}>Resumo Orbital (24h)</Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>[Prévia GEE - Sentinel 2]</Text>
      </View>

      {/* Seção de Alertas Inteligentes */}
      <Text style={styles.sectionTitle}>Alertas Inteligentes</Text>
      
      <AlertCard 
        title="Risco de Geada Severa" 
        badgeText="Alta Probabilidade" 
        description="Modelo detectou 87% de chance de queda drástica de temperatura nas próximas 48h (Dados: GEE)." 
        type="critical"
      />

      <AlertCard 
        title="Umidade do Solo (SMAP)" 
        badgeText="Estável" 
        description="Níveis ideais na zona radicular (45%). Irrigação não é necessária na Zona B." 
        type="success"
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    marginTop: 10,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#c7d8eb',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  mapText: {
    color: '#0b3d91',
    fontWeight: 'bold',
  }
});