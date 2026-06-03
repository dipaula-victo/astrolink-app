import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_ALERTS } from '../utils/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [areas, setAreas] = useState([]);
  const [activeArea, setActiveArea] = useState(null);

  // Carrega as áreas salvas ao iniciar o app
  useEffect(() => {
    const loadAreas = async () => {
      try {
        const storedAreas = await AsyncStorage.getItem('@astrolink_areas');
        const activeId = await AsyncStorage.getItem('@astrolink_active_area');
        
        if (storedAreas) {
          const parsedAreas = JSON.parse(storedAreas);
          setAreas(parsedAreas);
          
          if (activeId) {
            const found = parsedAreas.find(a => a.id === activeId);
            setActiveArea(found || parsedAreas[0]);
          } else {
            setActiveArea(parsedAreas[0]);
          }
        } else {
          // Se não houver nada salvo, cria uma área padrão inicial
          const defaultArea = { id: 'default', areaName: 'Fazenda São João - Setor Sul', latitude: '-23.5505', longitude: '-46.6333' };
          setAreas([defaultArea]);
          setActiveArea(defaultArea);
        }
      } catch (e) {
        console.error("Erro ao carregar áreas:", e);
      }
    };
    loadAreas();
  }, []);

  // Adiciona nova área e já a define como ativa
  const addArea = async (newAreaData) => {
    const areaWithId = { id: Date.now().toString(), ...newAreaData };
    const updatedAreas = [...areas, areaWithId];
    
    setAreas(updatedAreas);
    setActiveArea(areaWithId);
    
    await AsyncStorage.setItem('@astrolink_areas', JSON.stringify(updatedAreas));
    await AsyncStorage.setItem('@astrolink_active_area', areaWithId.id);
  };

  // Alterna entre as áreas cadastradas
  const changeActiveArea = async (id) => {
    const selected = areas.find(a => a.id === id);
    if (selected) {
      setActiveArea(selected);
      await AsyncStorage.setItem('@astrolink_active_area', id);
    }
  };

  return (
    <DataContext.Provider value={{ alerts, setAlerts, areas, activeArea, addArea, changeActiveArea }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}