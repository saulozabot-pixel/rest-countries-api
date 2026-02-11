'use client';

import { CountryCard } from './CountryCard';
import { CountryCardData } from '@/lib/types';

interface CountryGridProps {
    countries: CountryCardData[];
    isLoading?: boolean;
}

export function CountryGrid({ countries, isLoading }: CountryGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-[var(--color-elements)] rounded-md overflow-hidden shadow-md h-80 animate-pulse">
                        <div className="w-full h-40 bg-gray-300 dark:bg-gray-700" />
                        <div className="p-6 space-y-3">
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (countries.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-[var(--color-input)]">No countries found. Try adjusting your search or filter.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
            {countries.map((country) => (
                <CountryCard key={country.code} country={country} />
            ))}
        </div>
    );
}
