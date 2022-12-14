import { RedisCommandArgument, RedisCommandArguments } from '.';

export const FIRST_KEY_INDEX = 1;

export function transformArguments(
    key: RedisCommandArgument,
    field: RedisCommandArgument,
    value: RedisCommandArgument
): RedisCommandArguments {
    return ['HSETNX', key, field, value];
}

export { transformBooleanReply as transformReply } from './generic-transformers';
