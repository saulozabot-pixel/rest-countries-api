'use client';

import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export function RegionFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleRegionSelect = (region: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (region === selectedRegion) {
            // Deselect if clicking the same region
            params.delete('region');
            setSelectedRegion('');
        } else {
            params.set('region', region);
            setSelectedRegion(region);
        }
        router.push(`/?${params.toString()}`);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full md:w-[200px]" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[var(--color-elements)] text-[var(--color-text)] px-6 py-4 rounded-md shadow-md flex justify-between items-center hover:opacity-90 transition-opacity"
            >
                <span>{selectedRegion || 'Filter by Region'}</span>
                <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-1 w-full bg-[var(--color-elements)] rounded-md shadow-lg overflow-hidden z-10">
                    {REGIONS.map((region) => (
                        <button
                            key={region}
                            onClick={() => handleRegionSelect(region)}
                            className={`w-full text-left px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${selectedRegion === region ? 'font-semibold' : ''
                                }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
