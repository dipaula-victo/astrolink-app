import React, { createContext, useState, useContext } from 'react';
import { MOCK_ALERTS } from '../utils/mockData'; // <-- Nova importação

const DataContext = createContext();

export function DataProvider({ children }) {
  // O código fica incrivelmente mais enxuto!
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  return (
    <DataContext.Provider value={{ alerts, setAlerts }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}