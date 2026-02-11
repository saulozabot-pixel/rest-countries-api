'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { ReactNode } from 'react';

export function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
        </ThemeProvider>
    );
}
