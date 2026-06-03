import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function MapWidget() {
  return (
    <View style={styles.container}>
      
      {/* Fundo escuro simulando o mapa noturno/térmico */}
      <View style={styles.mapBackground}>
        
        {/* Zonas de calor simuladas com View e opacidade */}
        <View style={[styles.heatZone, styles.zoneCritical]} />
        <View style={[styles.heatZone, styles.zoneWarning]} />
        <View style={[styles.heatZone, styles.zoneGood]} />
        
        {/* Linha de escaneamento cruzado (mira) */}
        <View style={styles.crosshairVertical} />
        <View style={styles.crosshairHorizontal} />
      </View>

      {/* Rótulo de status sobreposto ao mapa */}
      <View style={styles.overlay}>
        <Ionicons name="earth-outline" size={14} color={COLORS.white} />
        <Text style={styles.overlayText}>GEE Sentinel-2 (Ao Vivo)</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: '#1f2937', // Fundo escuro (Dark Mode)
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 25,
    position: 'relative',
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
  },
  // Base para as manchas de calor
  heatZone: {
    position: 'absolute',
    borderRadius: 100, // Deixa redondo
    opacity: 0.5,
    // Efeito de desfoque (blur) no iOS, sombra no Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  // Configuração individual de cada "mancha"
  zoneCritical: { width: 90, height: 90, backgroundColor: COLORS.critical, top: -10, left: 30 },
  zoneWarning: { width: 140, height: 140, backgroundColor: '#f59e0b', bottom: -30, right: -20 },
  zoneGood: { width: 80, height: 80, backgroundColor: COLORS.success, top: 40, right: 60 },
  
  // Efeito de radar/grade
  crosshairVertical: { position: 'absolute', width: 1, height: '100%', backgroundColor: 'rgba(255,255,255,0.1)', left: '50%' },
  crosshairHorizontal: { position: 'absolute', width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.1)', top: '50%' },
  
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  overlayText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  }
});