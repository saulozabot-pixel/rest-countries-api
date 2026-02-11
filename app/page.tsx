'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/SearchBar';
import { RegionFilter } from '@/components/RegionFilter';
import { CountryGrid } from '@/components/CountryGrid';
import { getAllCountries, searchCountries, filterByRegion } from '@/lib/api';
import { Country, CountryCardData } from '@/lib/types';

export default function Home() {
  const searchParams = useSearchParams();
  const [countries, setCountries] = useState<CountryCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      setIsLoading(true);
      try {
        const searchQuery = searchParams.get('search');
        const regionQuery = searchParams.get('region');

        let data: Country[];

        if (searchQuery && regionQuery) {
          // Both search and filter
          const searchResults = await searchCountries(searchQuery);
          data = searchResults.filter(c => c.region === regionQuery);
        } else if (searchQuery) {
          // Only search
          data = await searchCountries(searchQuery);
        } else if (regionQuery) {
          // Only filter
          data = await filterByRegion(regionQuery);
        } else {
          // No filters
          data = await getAllCountries();
        }

        const formattedCountries: CountryCardData[] = data.map(country => ({
          name: country.name.common,
          flag: country.flags.svg,
          population: country.population,
          region: country.region,
          capital: country.capital?.[0] || 'N/A',
          code: country.cca3,
        }));

        setCountries(formattedCountries);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 md:mb-12">
        <SearchBar />
        <RegionFilter />
      </div>

      {/* Countries Grid */}
      <CountryGrid countries={countries} isLoading={isLoading} />
    </div>
  );
}
