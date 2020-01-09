/*! Copyright (c) 2019, XAPPmedia */
export interface Filter {
    type: "Date" | "Query";
}

export interface QueryFilter extends Filter {
    type: "Query";
    query: string;
}

export interface DateFilter extends Filter {
    type: "Date";
    start?: number;
    end?: number;
}
