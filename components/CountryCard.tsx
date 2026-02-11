import Link from 'next/link';
import Image from 'next/image';
import { CountryCardData } from '@/lib/types';
import { formatPopulation } from '@/lib/utils';

interface CountryCardProps {
    country: CountryCardData;
}

export function CountryCard({ country }: CountryCardProps) {
    return (
        <Link href={`/country/${country.code}`}>
            <div className="bg-[var(--color-elements)] rounded-md overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer h-full">
                <div className="relative w-full h-40">
                    <Image
                        src={country.flag}
                        alt={`Flag of ${country.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                </div>

                <div className="p-6">
                    <h2 className="text-lg font-extrabold mb-4 line-clamp-1">{country.name}</h2>

                    <div className="space-y-1 text-sm">
                        <p>
                            <span className="font-semibold">Population: </span>
                            {formatPopulation(country.population)}
                        </p>
                        <p>
                            <span className="font-semibold">Region: </span>
                            {country.region}
                        </p>
                        <p>
                            <span className="font-semibold">Capital: </span>
                            {country.capital || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
