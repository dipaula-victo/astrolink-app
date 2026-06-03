import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/constants/theme';
import { MOCK_REPORTS } from '../../src/utils/mockData';

export default function ReportsScreen() {
  
  // Configuração das animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleDownload = (fileName) => {
    Alert.alert("Download Iniciado", `Baixando o arquivo: ${fileName}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Envolvendo o conteúdo para animar a entrada */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Análises Consolidadas</Text>
          <Text style={styles.sectionDescription}>
            Relatórios gerados automaticamente pelo algoritmo de regressão e processamento em nuvem.
          </Text>
        </View>

        {MOCK_REPORTS.map((report) => (
          <View key={report.id} style={styles.reportItem}>
            <View style={[styles.iconBox, { backgroundColor: `${report.color}15` }]}>
              <Text style={[styles.iconText, { color: report.color }]}>{report.type}</Text>
            </View>
            
            <View style={styles.reportInfo}>
              <Text style={styles.reportTitle}>{report.title}</Text>
              <Text style={styles.reportSubtitle}>{report.subtitle}</Text>
            </View>

            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(report.title)}>
              <Text style={styles.downloadText}>BAIXAR</Text>
              <Ionicons name="download-outline" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ))}

      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  headerSection: { marginBottom: 25, marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 5 },
  sectionDescription: { fontSize: 14, color: COLORS.textMuted, lineHeight: 20 },
  reportItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 15, borderRadius: 12, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  iconBox: { width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  iconText: { fontWeight: 'bold', fontSize: 14 },
  reportInfo: { flex: 1 },
  reportTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 3 },
  reportSubtitle: { fontSize: 12, color: COLORS.textMuted },
  downloadButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#e0eaf5', borderRadius: 8, gap: 4 },
  downloadText: { color: COLORS.primary, fontSize: 12, fontWeight: 'bold' }
});