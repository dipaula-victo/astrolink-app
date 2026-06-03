import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import AlertCard from '../../src/components/AlertCard';
import MapWidget from '../../src/components/MapWidget';
import { useData } from '../../src/contexts/DataContext';
import { useRouter } from 'expo-router';
import { COLORS } from '../../src/constants/theme';

// Habilita as animações de layout no Android (O iOS já tem isso por padrão)
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DashboardScreen() {
  const { alerts, areas, activeArea, changeActiveArea } = useData();
  const router = useRouter(); 

  // Configuração das animações de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Roda as duas animações paralelamente ao abrir a tela
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  // Função para trocar a área com transição suave
  const handleAreaSelection = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    changeActiveArea(id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Envolvemos o conteúdo no componente Animated.View */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        
        {/* NOVO: Seletor Horizontal de Regiões */}
        <View style={styles.selectorHeader}>
          <Text style={styles.sectionTitle}>Regiões Monitoradas</Text>
          <TouchableOpacity onPress={() => router.push('/add-area')}>
            <Text style={styles.addText}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
          {areas.map(area => {
            const isActive = activeArea?.id === area.id;
            return (
              <TouchableOpacity 
                key={area.id} 
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => handleAreaSelection(area.id)}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {area.areaName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Resumo Orbital (24h)</Text>
        <MapWidget />

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
        
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  
  selectorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 15 },
  addText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14, marginBottom: 15 },
  
  chipContainer: { marginBottom: 25, flexDirection: 'row' },
  chip: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: COLORS.white, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.textMuted, fontSize: 13, fontWeight: 'bold' },
  chipTextActive: { color: COLORS.white },
});