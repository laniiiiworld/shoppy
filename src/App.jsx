import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { AuthContextProvider } from './constext/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartContextProvider } from './constext/CartContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}
