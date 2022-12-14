export const FIRST_KEY_INDEX = 1;

export function transformArguments(key: string, path?: string): Array<string> {
    const args = ['JSON.OBJLEN', key];

    if (path) {
        args.push(path);
    }

    return args;
}

export declare function transformReply(): number | null | Array<number | null>;
