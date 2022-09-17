import { RedisCommandArguments } from '@redis/client/dist/lib/commands';
import { transformTuplesReply } from '@redis/client/dist/lib/commands/generic-transformers';
import { pushSearchOptions, RedisSearchLanguages, Params, PropertyName, SortByProperty, SearchReply } from '.';

export const FIRST_KEY_INDEX = 1;

export const IS_READ_ONLY = true;

export interface SearchOptions {
    // NOCONTENT?: true; TODO
    VERBATIM?: true;
    NOSTOPWORDS?: true;
    // WITHSCORES?: true;
    // WITHPAYLOADS?: true;
    WITHSORTKEYS?: true;
    // FILTER?: {
    //     field: string;
    //     min: number | string;
    //     max: number | string;
    // };
    // GEOFILTER?: {
    //     field: string;
    //     lon: number;
    //     lat: number;
    //     radius: number;
    //     unit: 'm' | 'km' | 'mi' | 'ft';
    // };
    INKEYS?: string | Array<string>;
    INFIELDS?: string | Array<string>;
    RETURN?: string | Array<string>;
    SUMMARIZE?: true | {
        FIELDS?: PropertyName | Array<PropertyName>;
        FRAGS?: number;
        LEN?: number;
        SEPARATOR?: string;
    };
    HIGHLIGHT?: true | {
        FIELDS?: PropertyName | Array<PropertyName>;
        TAGS?: {
            open: string;
            close: string;
        };
    };
    SLOP?: number;
    INORDER?: true;
    LANGUAGE?: RedisSearchLanguages;
    EXPANDER?: string;
    SCORER?: string;
    // EXPLAINSCORE?: true; // TODO: WITHSCORES
    // PAYLOAD?: ;
    SORTBY?: SortByProperty;
    // MSORTBY?: SortByProperty | Array<SortByProperty>;
    LIMIT?: {
        from: number | string;
        size: number | string;
    };
    PARAMS?: Params;
    DIALECT?: number;
}

export function transformArguments(
    index: string,
    query: string,
    options?: SearchOptions
): RedisCommandArguments {
    return pushSearchOptions(
        ['FT.SEARCH', index, query],
        options
    );
}

export type SearchRawReply = Array<any>;

export function transformReply(reply: SearchRawReply): SearchReply {
    const documents = [];
    for (let i = 1; i < reply.length; i += 2) {
        const tuples = reply[i + 1];
        documents.push({
            id: reply[i],
            value: tuples.length === 2 && tuples[0] === '$' ?
                JSON.parse(tuples[1]) :
                transformTuplesReply(tuples)
        });
    }

    return {
        total: reply[0],
        documents
    };
}
