import { useState } from 'react';

export function useSettingsViewModel() {
  const [studioName, setStudioName] = useState('Onit Studio');
  const [currency, setCurrency] = useState('USD');
  const [timeFormat, setTimeFormat] = useState('24h');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  const handleSaveSettings = () => {
    console.log('Saving settings:', {
      studioName,
      currency,
      timeFormat,
      notificationsEnabled,
      emailNotifications,
      inAppNotifications,
    });
    // In a real app, you'd send this data to a backend API
  };

  return {
    studioName,
    setStudioName,
    currency,
    setCurrency,
    timeFormat,
    setTimeFormat,
    notificationsEnabled,
    setNotificationsEnabled,
    emailNotifications,
    setEmailNotifications,
    inAppNotifications,
    setInAppNotifications,
    handleSaveSettings,
  };
}
