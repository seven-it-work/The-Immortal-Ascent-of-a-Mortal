import Chance from 'chance'

export const randomUtil = new Chance()


export const uuid = () => randomUtil.guid()


export const pickList = (list: T[], size: number = 1): T[] => {
    if (list.length <= 0) {
        return []
    }
    if (size === 1 || list.length === 1) {
        return [randomUtil.pickOne(list)]
    } else {
        return randomUtil.pick(list, size)
    }
}

/**
 * 概率工具
 * @param num 越大概率越大
 * @param max 最大值
 */
export const randomProbability = (num: number, max: number = 100): boolean => {
    if (num <= 0) {
        return false
    }
    const integer = randomUtil.integer({min: 0, max});
    return num >= integer;
}

export const getPercent = (fenZi: number | undefined, fenMu: number | undefined, numberSize: number = 1): number => {
    if (!fenZi || !fenMu) {
        return 0;
    }
    return Number.parseInt((fenZi / fenMu * 100).toFixed(numberSize))
}

export const ProbabilitySelector = <T>(probabilityList: Probability<T>[]): T => {
    // 求和
    if (probabilityList.length <= 0) {
        throw new Error("错误概率选择器")
    }
    let sum = 0;
    probabilityList.forEach(data => sum += data.probability)
    const integer = randomUtil.integer({min: 1, max: sum});
    let temp = 0;
    for (let i = 0; i < probabilityList.length; i++) {
        const probabilityListElement = probabilityList[i];
        temp += probabilityListElement.probability;
        if (integer <= temp) {
            return probabilityListElement.data;
        }
    }
    throw new Error("错误概率选择器")
}

export interface Probability<T> {
    data: T;
    probability: number;
}