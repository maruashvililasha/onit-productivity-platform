export interface Integration {
  id: number;
  name: string;
  description: string;
  status: 'connected' | 'disconnected';
  icon: string;
}

const integrationsData: Integration[] = [
  {
    id: 1,
    name: 'Linear',
    description: 'Sync projects and issues from Linear to track time and progress.',
    status: 'connected',
    icon: '📊',
  },
  {
    id: 2,
    name: 'Slack',
    description: 'Get notifications and updates directly in your Slack workspace.',
    status: 'connected',
    icon: '💬',
  },
  {
    id: 3,
    name: 'Stripe',
    description: 'Process payments and manage subscriptions with Stripe.',
    status: 'disconnected',
    icon: '💳',
  },
  {
    id: 4,
    name: 'GitHub',
    description: 'Connect repositories and track commits for better project insights.',
    status: 'disconnected',
    icon: '🐙',
  },
  {
    id: 5,
    name: 'Google Calendar',
    description: 'Sync your schedule and time entries with Google Calendar.',
    status: 'disconnected',
    icon: '📅',
  },
  {
    id: 6,
    name: 'Notion',
    description: 'Export reports and sync project documentation with Notion.',
    status: 'disconnected',
    icon: '📝',
  },
];

export function useIntegrationsViewModel() {
  return {
    integrations: integrationsData,
  };
}
