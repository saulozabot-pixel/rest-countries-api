import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getCountryByCode, getBorderCountries } from '@/lib/api';
import { formatPopulation, getNativeName, getCurrencies, getLanguages } from '@/lib/utils';

interface PageProps {
    params: Promise<{ code: string }>;
}

export default async function CountryPage({ params }: PageProps) {
    const { code } = await params;

    let country;
    try {
        country = await getCountryByCode(code);
    } catch (error) {
        notFound();
    }

    const borderCountries = country.borders
        ? await getBorderCountries(country.borders)
        : [];

    const nativeName = getNativeName(country.name.nativeName);

    return (
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[var(--color-elements)] px-8 py-2 rounded-md shadow-md hover:shadow-lg transition-shadow mb-12 md:mb-16"
            >
                <ArrowLeft size={18} />
                <span>Back</span>
            </Link>

            {/* Country Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Flag */}
                <div className="relative w-full h-64 md:h-96">
                    <Image
                        src={country.flags.svg}
                        alt={`Flag of ${country.name.common}`}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Information */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-6">{country.name.common}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Left Column */}
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Native Name: </span>
                                {nativeName || country.name.common}
                            </p>
                            <p>
                                <span className="font-semibold">Population: </span>
                                {formatPopulation(country.population)}
                            </p>
                            <p>
                                <span className="font-semibold">Region: </span>
                                {country.region}
                            </p>
                            <p>
                                <span className="font-semibold">Sub Region: </span>
                                {country.subregion || 'N/A'}
                            </p>
                            <p>
                                <span className="font-semibold">Capital: </span>
                                {country.capital?.[0] || 'N/A'}
                            </p>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Top Level Domain: </span>
                                {country.tld?.[0] || 'N/A'}
                            </p>
                            <p>
                                <span className="font-semibold">Currencies: </span>
                                {getCurrencies(country.currencies)}
                            </p>
                            <p>
                                <span className="font-semibold">Languages: </span>
                                {getLanguages(country.languages)}
                            </p>
                        </div>
                    </div>

                    {/* Border Countries */}
                    {borderCountries.length > 0 && (
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <span className="font-semibold whitespace-nowrap">Border Countries:</span>
                            <div className="flex flex-wrap gap-2">
                                {borderCountries.map((border) => (
                                    <Link
                                        key={border.cca3}
                                        href={`/country/${border.cca3}`}
                                        className="bg-[var(--color-elements)] px-6 py-1 rounded-sm shadow-md hover:shadow-lg transition-shadow text-sm"
                                    >
                                        {border.name.common}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
