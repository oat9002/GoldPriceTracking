import * as db from "../dal/db";
import { Price } from "../models/Price";
import { User } from "../models/User";
import { deleteCacheByPrefix, getCache, setCache } from "../service/CacheService";

const priceCachePrefix = "price";
const userCachePrefix = "user";
const getLaatestPriceCacheKey = createCacheKey(priceCachePrefix, "getLaatestPrice");
const getLatestPricesCacheKey = createCacheKey(priceCachePrefix, "getLatestPrices");
const getPricesLastByDayCacheKey = createCacheKey(priceCachePrefix, "getPricesLastByDay");
const getAllUserCacheKey = createCacheKey(userCachePrefix, "getAllUser");

function createCacheKey(...key: string[]): string {
    return `${key.join("_")}`;
}

export async function addPrice(buy: number, sell: number): Promise<void> {
    db.addPrice(buy, sell);

    deleteCacheByPrefix(priceCachePrefix);
}

export async function shouldAddPrice(buy: number, sell: number): Promise<boolean> {
    return db.shouldAddPrice(buy, sell);
}

export async function getLatestPrice(): Promise<Price> {
    const cached = getCache<Price>(getLaatestPriceCacheKey);

    if (cached) {
        return cached;
    }

    const latestPrice = await db.getLatestPrice();

    setCache(getLaatestPriceCacheKey, latestPrice);

    return latestPrice;
}

export async function addLineUser(userId: string): Promise<void> {
    db.addLineUser(userId);

    deleteCacheByPrefix(userCachePrefix);
}

export async function getAllUser(): Promise<User[]> {
    const cached = getCache<User[]>(getAllUserCacheKey);

    if (cached) {
        return cached;
    }

    const users = db.getAllUser();

    setCache(getAllUserCacheKey, users);

    return users;
}

/* number: number of latest data (0 = all)*/
export async function getLatestPrices(number: number): Promise<Price[]> {
    const cacheKey = createCacheKey(getLatestPricesCacheKey, number.toString());
    const cached = getCache<Price[]>(cacheKey);

    if (cached) {
        return cached;
    }

    const latestPrices = await db.getLatestPrices(number);

    setCache(cacheKey, latestPrices);

    return latestPrices;
}

export async function getPricesLastByDay(days: number) {
    const cacheKey = createCacheKey(getPricesLastByDayCacheKey, days.toString());
    const cached = getCache<Price[]>(cacheKey);

    if (cached) {
        return cached;
    }

    const prices = await db.getPricesLastByDay(days);

    setCache(cacheKey, prices);

    return prices;
}
