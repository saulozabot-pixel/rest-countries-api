export interface Country {
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    population: number;
    region: string;
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages?: {
        [key: string]: string;
    };
    borders?: string[];
    cca3: string;
    cca2: string;
}

export interface CountryCardData {
    name: string;
    flag: string;
    population: number;
    region: string;
    capital: string;
    code: string;
}
