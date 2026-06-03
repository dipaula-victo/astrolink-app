import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function MapScreen() {
  const [loading, setLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState('thermal'); // 'thermal', 'ndvi', '3d'

  // Simula o tempo de resposta e renderização do motor analítico do GEE ao montar a tela
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2 segundos de simulação de carregamento

    return () => clearTimeout(timer);
  }, [activeLayer]); // Recarrega simulando novo processamento sempre que a camada mudar

  // Função auxiliar para mudar a cor de fundo com base na camada selecionada
  const getMapBackground = () => {
    switch (activeLayer) {
      case 'ndvi':
        return '#1b4d3e'; // Tom esverdeado para o Índice de Vegetação (NDVI)
      case '3d':
        return '#5c4033'; // Tom terroso para simular relevo/topografia
      default:
        return '#1f2937'; // Tom escuro/térmico padrão
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0b3d91" />
          <Text style={styles.loadingText}>RENDERIZANDO MOTOR GEE...</Text>
        </View>
      ) : (
        <View style={[styles.mapContainer, { backgroundColor: getMapBackground() }]}>
          
          {/* Texto Central Indicativo de Renderização Orbital */}
          <Text style={styles.mapLabel}>
            VISÃO SATELITAL: {activeLayer.toUpperCase()}
          </Text>

          {/* Alvo Georreferenciado de Risco Extremo (Risco de Geada) */}
          <View style={styles.targetMarker}>
            <View style={styles.targetPulse} />
            <Text style={styles.targetText}>Risco Geada</Text>
          </View>

          {/* Painel Flutuante de Controle de Camadas (Lado Direito) */}
          <View style={styles.layerControlContainer}>
            <TouchableOpacity 
              style={[styles.layerButton, activeLayer === 'thermal' && styles.activeButton]}
              onPress={() => setActiveLayer('thermal')}
            >
              <Text style={[styles.layerButtonText, activeLayer === 'thermal' && styles.activeButtonText]}>
                Camada: Térmica
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.layerButton, activeLayer === 'ndvi' && styles.activeButton]}
              onPress={() => setActiveLayer('ndvi')}
            >
              <Text style={[styles.layerButtonText, activeLayer === 'ndvi' && styles.activeButtonText]}>
                Índice NDVI
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.layerButton, activeLayer === '3d' && styles.activeButton]}
              onPress={() => setActiveLayer('3d')}
            >
              <Text style={[styles.layerButtonText, activeLayer === '3d' && styles.activeButtonText]}>
                Topografia 3D
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nota de rodapé informativa sobre as coordenadas */}
          <View style={styles.coordinatesFooter}>
            <Text style={styles.footerText}>Anomalia climática detectada via Sentinel-2</Text>
          </View>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#0b3d91',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 16,
    position: 'absolute',
    top: 30,
  },
  layerControlContainer: {
    position: 'absolute',
    top: 30,
    right: 20,
    gap: 10,
    maxWidth: 150,
  },
  layerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  activeButton: {
    backgroundColor: '#0b3d91', // Destaca com o Azul NASA
  },
  layerButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0b3d91',
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  targetMarker: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetPulse: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#fc3d21', // Vermelho de criticidade
    backgroundColor: 'rgba(252, 61, 33, 0.3)',
  },
  targetText: {
    position: 'absolute',
    top: -28,
    backgroundColor: '#fc3d21',
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  coordinatesFooter: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 12,
  },
});