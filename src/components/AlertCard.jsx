import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme'; // Importação do tema

export default function AlertCard({ title, badgeText, description, type = 'info' }) {
  
  const getColors = () => {
    switch (type) {
      case 'critical':
        return { border: COLORS.critical, badgeBg: COLORS.criticalBg, badgeText: COLORS.critical };
      case 'success':
        return { border: COLORS.success, badgeBg: COLORS.successBg, badgeText: COLORS.success };
      default:
        return { border: COLORS.primary, badgeBg: `${COLORS.primary}20`, badgeText: COLORS.primary }; 
    }
  };

  const colors = getColors();

  return (
    <View style={[styles.card, { borderLeftColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>{badgeText}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontWeight: 'bold', fontSize: 16, color: COLORS.textMain, flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 10 },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  description: { fontSize: 14, color: COLORS.textMuted, lineHeight: 20 },
});