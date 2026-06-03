import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlertCard({ title, badgeText, description, type = 'info' }) {
  // Define as cores dinamicamente com base no tipo de alerta
  const getColors = () => {
    switch (type) {
      case 'critical':
        return { border: '#fc3d21', badgeBg: '#fee2e2', badgeText: '#fc3d21' }; // Vermelho Alerta
      case 'success':
        return { border: '#059669', badgeBg: '#d1fae5', badgeText: '#059669' }; // Verde Estável
      default:
        return { border: '#0b3d91', badgeBg: '#e0eaf5', badgeText: '#0b3d91' }; // Azul Padrão
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    // Sombra para dar destaque
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});