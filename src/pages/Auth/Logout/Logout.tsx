import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthStore } from '../../../store/AuthContext';

function Logout() {
  const authStore = useAuthStore();

  useEffect(() => {
    authStore.setToken('');
    sessionStorage.clear();
  });

  return <Redirect to="/" />;
}

export default Logout;
