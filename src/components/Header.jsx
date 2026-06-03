import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { useData } from '../contexts/DataContext';

export default function Header() {
  const insets = useSafeAreaInsets();
  const { activeArea } = useData();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <Text style={styles.title}>AstroLink Analytics</Text>
      {/* Exibe o nome da área ou "Carregando..." enquanto lê do disco */}
      <Text style={styles.subtitle}>
        {activeArea ? activeArea.areaName : 'Carregando região...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  title: { color: COLORS.white, fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: COLORS.white, fontSize: 14, opacity: 0.8, marginTop: 5 },
});