'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/SearchBar';
import { RegionFilter } from '@/components/RegionFilter';
import { CountryGrid } from '@/components/CountryGrid';
import { getAllCountries, searchCountries, filterByRegion } from '@/lib/api';
import { Country, CountryCardData } from '@/lib/types';

function HomeContent() {
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
          // Load all
          data = await getAllCountries();
        }

        const mappedData: CountryCardData[] = data.map(country => ({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital?.[0] || 'N/A',
          flag: country.flags.svg,
          code: country.cca3
        }));

        setCountries(mappedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, [searchParams]);

  return (
    <main className="container mx-auto px-4 py-6 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-8 md:mb-12">
        <SearchBar />
        <RegionFilter />
      </div>

      <CountryGrid countries={countries} isLoading={isLoading} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 md:mb-12">
          <div className="h-14 bg-[var(--color-elements)] rounded-md w-full md:w-96 animate-pulse" />
          <div className="h-14 bg-[var(--color-elements)] rounded-md w-full md:w-52 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-[var(--color-elements)] rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
