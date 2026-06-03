import React, { createContext, useState, useContext } from 'react';

// 1. Criação do Contexto
const DataContext = createContext();

// 2. Criação do Provider (Provedor) que vai envolver a nossa aplicação
export function DataProvider({ children }) {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      title: 'Risco de Geada Severa',
      badgeText: 'Alta Probabilidade',
      description: 'Modelo detectou 87% de chance de queda drástica de temperatura nas próximas 48h (Dados: GEE).',
      type: 'critical'
    },
    {
      id: '2',
      title: 'Umidade do Solo (SMAP)',
      badgeText: 'Estável',
      description: 'Níveis ideais na zona radicular (45%). Irrigação não é necessária na Zona B.',
      type: 'success'
    }
  ]);

  // Futuramente, criar funções para adicionar novos alertas via API

  return (
    <DataContext.Provider value={{ alerts, setAlerts }}>
      {children}
    </DataContext.Provider>
  );
}

// 3. Hook customizado para facilitar o uso em outras telas
export function useData() {
  return useContext(DataContext);
}