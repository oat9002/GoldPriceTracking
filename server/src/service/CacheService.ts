import NodeCache from "node-cache";

const cache = new NodeCache();

export function setCache(key: string, value: any, ttl: number = 60 * 60 * 1): boolean {
    return cache.set(key, value, ttl);
}

export function getCache<T>(key: string): T | undefined {
    return cache.get(key);
}

export function deleteCache(key: string): boolean {
    return cache.del(key) > 0;
}

export function deleteCacheByPrefix(prefix: string): boolean {
    const keys = cache.keys().filter((key) => key.startsWith(prefix));
    return cache.del(keys) > 0;
}
