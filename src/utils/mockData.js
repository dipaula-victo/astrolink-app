import { COLORS } from '../constants/theme';

// Array simulando o retorno da API do GEE para os Alertas do Dashboard
export const MOCK_ALERTS = [
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
];

// Array simulando o histórico de exportações do sistema
export const MOCK_REPORTS = [
  {
    id: '1',
    type: 'PDF',
    title: 'Previsão Climática Mensal',
    subtitle: 'Maio 2026 - Tendências',
    color: COLORS.critical 
  },
  {
    id: '2',
    type: 'XLS',
    title: 'Histórico de Umidade',
    subtitle: 'Exportação de Telemetria IoT',
    color: COLORS.success 
  },
  {
    id: '3',
    type: 'PDF',
    title: 'Análise de Safra - Q1',
    subtitle: 'Comparativo Anômalo (SMOTE)',
    color: COLORS.critical
  }
];