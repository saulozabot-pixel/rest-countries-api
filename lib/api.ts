import { Country } from './types';

const BASE_URL = 'https://restcountries.com/v3.1';

export async function getAllCountries(): Promise<Country[]> {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) throw new Error('Failed to fetch countries');
    return response.json();
}

export async function searchCountries(name: string): Promise<Country[]> {
    const response = await fetch(`${BASE_URL}/name/${name}`);
    if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Failed to search countries');
    }
    return response.json();
}

export async function filterByRegion(region: string): Promise<Country[]> {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) throw new Error('Failed to filter countries');
    return response.json();
}

export async function getCountryByCode(code: string): Promise<Country> {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) throw new Error('Failed to fetch country');
    const data = await response.json();
    return Array.isArray(data) ? data[0] : data;
}

export async function getBorderCountries(codes: string[]): Promise<Country[]> {
    if (!codes || codes.length === 0) return [];
    const response = await fetch(`${BASE_URL}/alpha?codes=${codes.join(',')}`);
    if (!response.ok) return [];
    return response.json();
}
