import { RedisCommandArgument, RedisCommandArguments } from '.';
import { pushVerdictArguments } from './generic-transformers';

export const FIRST_KEY_INDEX = 1;

export function transformArguments(
    destination: RedisCommandArgument,
    keys: RedisCommandArgument | Array<RedisCommandArgument>
): RedisCommandArguments {
    return pushVerdictArguments(['SINTERSTORE', destination], keys);
}

export declare function transformReply(): Array<RedisCommandArgument>;
