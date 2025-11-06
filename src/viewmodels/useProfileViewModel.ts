import { useState } from 'react';

export function useProfileViewModel() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@onit.com');
  const [role, setRole] = useState('Senior Developer');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  const handleUpdateProfile = () => {
    console.log('Updating profile:', { name, email, role });
    // In a real app, send to backend
  };

  const handleChangePassword = () => {
    setPasswordChangeError('');
    setPasswordChangeSuccess('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordChangeError('All password fields are required.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordChangeError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('New passwords do not match.');
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordChangeError('New password cannot be the same as current password.');
      return;
    }

    console.log('Changing password...');
    // Simulate API call
    setTimeout(() => {
      // In a real app, verify current password with backend
      if (currentPassword === 'test123') { // Dummy check
        setPasswordChangeSuccess('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setPasswordChangeError('Incorrect current password.');
      }
    }, 1000);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    role,
    setRole,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    passwordChangeError,
    passwordChangeSuccess,
    handleUpdateProfile,
    handleChangePassword,
  };
}
