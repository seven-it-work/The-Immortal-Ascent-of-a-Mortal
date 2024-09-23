import Chance from 'chance'

export const randomUtil = new Chance()


export const uuid = () => randomUtil.guid()

console.log(uuid())

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