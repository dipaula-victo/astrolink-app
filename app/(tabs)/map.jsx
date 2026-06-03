import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../src/constants/theme';

export default function MapScreen() {
  const [loading, setLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState('thermal');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // useEffect de Carregamento de Dados
  useEffect(() => {
    const loadSavedLayer = async () => {
      try {
        const savedLayer = await AsyncStorage.getItem('@astrolink_layer_pref');
        if (savedLayer !== null) setActiveLayer(savedLayer);
      } catch (error) {
        console.error('Erro ao ler do AsyncStorage:', error);
      } finally {
        setTimeout(() => setLoading(false), 1200);
      }
    };
    loadSavedLayer();
  }, []);

  // Dispara a animação SEMPRE que o loading terminar
  useEffect(() => {
    if (!loading) {
      // Reseta os valores para 0 para a animação poder acontecer de novo
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
      
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    }
  }, [loading]); // Ouve a variável loading

  const handleLayerChange = async (layer) => {
    setActiveLayer(layer);
    setLoading(true); // Fica true, o que faz a tela de carregamento voltar
    try {
      await AsyncStorage.setItem('@astrolink_layer_pref', layer);
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage:', error);
    }
    setTimeout(() => setLoading(false), 1200);
  };

  const getMapBackground = () => {
    switch (activeLayer) {
      case 'ndvi': return '#1b4d3e'; 
      case '3d': return '#5c4033'; 
      default: return '#1f2937'; 
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>RENDERIZANDO MOTOR GEE...</Text>
        </View>
      ) : (
        <Animated.View style={[styles.mapContainer, { backgroundColor: getMapBackground(), opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          
          <Text style={styles.mapLabel}>VISÃO SATELITAL: {activeLayer.toUpperCase()}</Text>

          <View style={styles.targetMarker}>
            <View style={styles.targetPulse} />
            <Text style={styles.targetText}>Risco Geada</Text>
          </View>

          <View style={styles.layerControlContainer}>
            <TouchableOpacity style={[styles.layerButton, activeLayer === 'thermal' && styles.activeButton]} onPress={() => handleLayerChange('thermal')}>
              <Text style={[styles.layerButtonText, activeLayer === 'thermal' && styles.activeButtonText]}>Camada: Térmica</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.layerButton, activeLayer === 'ndvi' && styles.activeButton]} onPress={() => handleLayerChange('ndvi')}>
              <Text style={[styles.layerButtonText, activeLayer === 'ndvi' && styles.activeButtonText]}>Índice NDVI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.layerButton, activeLayer === '3d' && styles.activeButton]} onPress={() => handleLayerChange('3d')}>
              <Text style={[styles.layerButtonText, activeLayer === '3d' && styles.activeButtonText]}>Topografia 3D</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coordinatesFooter}>
            <Text style={styles.footerText}>Anomalia climática detectada via Sentinel-2</Text>
          </View>

        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 14, color: COLORS.primary, fontWeight: 'bold', letterSpacing: 1.5 },
  mapContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  mapLabel: { color: 'rgba(255, 255, 255, 0.4)', fontWeight: 'bold', letterSpacing: 2, fontSize: 16, position: 'absolute', top: 30 },
  layerControlContainer: { position: 'absolute', top: 30, right: 20, gap: 10, maxWidth: 150 },
  layerButton: { backgroundColor: 'rgba(255, 255, 255, 0.9)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 4 },
  activeButton: { backgroundColor: COLORS.primary },
  layerButtonText: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
  activeButtonText: { color: COLORS.white },
  targetMarker: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  targetPulse: { width: 24, height: 24, borderRadius: 12, borderWidth: 3, borderColor: COLORS.critical, backgroundColor: 'rgba(252, 61, 33, 0.3)' },
  targetText: { position: 'absolute', top: -28, backgroundColor: COLORS.critical, color: COLORS.white, fontSize: 11, fontWeight: 'bold', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 4, overflow: 'hidden' },
  coordinatesFooter: { position: 'absolute', bottom: 20, backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 15 },
  footerText: { color: COLORS.white, fontSize: 12 },
});