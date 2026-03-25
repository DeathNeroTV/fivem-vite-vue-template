export type Primitive = string | number;
export type OptionObject<T = any> = { label: string; value: T; image?: string };
export type VariantType = 'neutral' | 'neutral-green' | 'neutral-orange' | 'neutral-red' | 'neutral-blue' | 'neutral-yellow' | 'green' | 'orange' | 'red' | 'blue' | 'yellow';

export type Column = {
    key: string;
    label: string;
    format?: (row: any) => any;
    sortable?: boolean;
};