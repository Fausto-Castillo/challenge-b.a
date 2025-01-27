export interface DataUSADataItem {
    'ID Nation'?: string;
    Nation?: string;
    'ID Year'?: number;
    Year: string;
    Population?: number;
    'Foreign-Born Citizens'?: number;
    'Slug Nation'?: string;
    State?: string;
    'ID State'?: string;
}

export interface DataUSASourceItem {
    measures: string[];
    annotations: {
        source_name: string;
        source_description: string;
        dataset_name: string;
        dataset_link: string;
        table_id: string;
        topic: string;
    };
    name: string;
    substitutions: unknown[];
}

export interface DataUSAResponse {
    data: DataUSADataItem[];
    source: DataUSASourceItem[];
}

export interface StateOption {
    'State': string;
    'ID State': string;
}

export interface ChartData {
    name: string;
    population: number;
    foreignBorn?: number;
}