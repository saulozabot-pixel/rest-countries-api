'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (search) {
                params.set('search', search);
            } else {
                params.delete('search');
            }
            router.push(`/?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, router, searchParams]);

    return (
        <div className="relative w-full md:w-[480px]">
            <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--color-input)]"
                size={18}
            />
            <input
                type="text"
                placeholder="Search for a country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[var(--color-elements)] text-[var(--color-text)] pl-16 pr-6 py-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
