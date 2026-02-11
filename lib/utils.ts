import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPopulation(population: number): string {
    return population.toLocaleString('en-US');
}

export function getNativeName(nativeName?: { [key: string]: { common: string } }): string {
    if (!nativeName) return '';
    const firstKey = Object.keys(nativeName)[0];
    return nativeName[firstKey]?.common || '';
}

export function getCurrencies(currencies?: { [key: string]: { name: string } }): string {
    if (!currencies) return 'N/A';
    return Object.values(currencies).map(c => c.name).join(', ');
}

export function getLanguages(languages?: { [key: string]: string }): string {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
}
