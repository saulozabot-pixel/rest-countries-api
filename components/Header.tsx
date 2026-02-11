'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-[var(--color-elements)] shadow-md">
            <div className="container mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
                <h1 className="text-lg md:text-2xl font-extrabold">Where in the world?</h1>

                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-sm md:text-base font-semibold hover:opacity-70 transition-opacity"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? (
                        <>
                            <Moon size={18} />
                            <span>Dark Mode</span>
                        </>
                    ) : (
                        <>
                            <Sun size={18} />
                            <span>Light Mode</span>
                        </>
                    )}
                </button>
            </div>
        </header>
    );
}
