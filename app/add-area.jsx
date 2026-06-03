import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object({
  areaName: yup.string().required('O nome da área é obrigatório.'),
  latitude: yup
    .number()
    .typeError('A latitude deve ser um número válido.')
    .min(-90, 'A latitude não pode ser menor que -90.')
    .max(90, 'A latitude não pode ser maior que 90.')
    .required('A latitude é obrigatória.'),
  longitude: yup
    .number()
    .typeError('A longitude deve ser um número válido.')
    .min(-180, 'A longitude não pode ser menor que -180.')
    .max(180, 'A longitude não pode ser maior que 180.')
    .required('A longitude é obrigatória.'),
}).required();

export default function AddAreaScreen() {
  const router = useRouter();
  
  // Adicionado defaultValues para evitar o erro de "uncontrolled input"
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      areaName: '',
      latitude: '',
      longitude: '',
    }
  });

  // Função assíncrona que realmente salva os dados localmente
  const onSubmit = async (data) => {
    try {
      // Converte o objeto do formulário em uma string JSON para salvar no AsyncStorage
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@astrolink_target_area', jsonValue);
      
      Alert.alert(
        "Área Salva com Sucesso!", 
        `A região "${data.areaName}" foi registrada para monitoramento orbital.`,
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar os dados da região.");
      console.error(e);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formCard}>
        
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0b3d91" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Definir Área de Interesse</Text>
            <Text style={styles.headerSubtitle}>Insira as coordenadas exatas.</Text>
          </View>
        </View>

        <Text style={styles.label}>Nome da Região</Text>
        <Controller
          control={control}
          name="areaName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.areaName && styles.inputError]}
              placeholder="Ex: Fazenda São João - Lote B"
              placeholderTextColor="#a0a0a0"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.areaName && <Text style={styles.errorText}>{errors.areaName.message}</Text>}

        <Text style={styles.label}>Latitude (GDD)</Text>
        <Controller
          control={control}
          name="latitude"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.latitude && styles.inputError]}
              placeholder="Ex: -23.5505"
              placeholderTextColor="#a0a0a0"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.latitude && <Text style={styles.errorText}>{errors.latitude.message}</Text>}

        <Text style={styles.label}>Longitude (GDD)</Text>
        <Controller
          control={control}
          name="longitude"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.longitude && styles.inputError]}
              placeholder="Ex: -46.6333"
              placeholderTextColor="#a0a0a0"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.longitude && <Text style={styles.errorText}>{errors.longitude.message}</Text>}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>VALIDAR E SALVAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6', justifyContent: 'center', padding: 20 },
  formCard: { backgroundColor: '#ffffff', borderRadius: 15, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 4 },
  formHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { marginRight: 15, padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0b3d91' },
  headerSubtitle: { fontSize: 12, color: '#777777' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333333', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 15, color: '#333' },
  inputError: { borderColor: '#fc3d21', backgroundColor: '#fee2e2' },
  errorText: { color: '#fc3d21', fontSize: 12, marginTop: 4, fontWeight: 'bold' },
  submitButton: { backgroundColor: '#0b3d91', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  submitButtonText: { color: '#ffffff', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
});