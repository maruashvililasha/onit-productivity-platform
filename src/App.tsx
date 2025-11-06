import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from './components/AppShell';
import { AuthScreen } from './screens/AuthScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { TeamScreen } from './screens/TeamScreen';
import { TimeTrackingScreen } from './screens/TimeTrackingScreen';
import { FinanceScreen } from './screens/FinanceScreen';
import { ClientsScreen } from './screens/ClientsScreen';
import { InvoicesScreen } from './screens/InvoicesScreen';
import { IntegrationsScreen } from './screens/IntegrationsScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Test credentials
    if (email === 'test@onit.com' && password === 'test123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/auth" element={<AuthScreen onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        ) : (
          <AppShell onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/insights" element={<InsightsScreen />} />
              <Route path="/projects" element={<ProjectsScreen />} />
              <Route path="/team" element={<TeamScreen />} />
              <Route path="/time-tracking" element={<TimeTrackingScreen />} />
              <Route path="/finance" element={<FinanceScreen />} />
              <Route path="/clients" element={<ClientsScreen />} />
              <Route path="/invoices" element={<InvoicesScreen />} />
              <Route path="/integrations" element={<IntegrationsScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppShell>
        )}
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
