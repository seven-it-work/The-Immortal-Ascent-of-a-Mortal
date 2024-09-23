import Path from "./path/Path.ts";
import cloneDeep from 'lodash'
import {randomUtil} from "../util/ProbabilityUtils.ts";


export default class Continet {
    id: string;
    name: string;
    wordId: string;
    pathMap: Map<Path, number> = new Map();
    pathMapBak: Map<Path, number> = new Map();
    pathIdMap: Map<string, Path> = new Map();
    pathCountMap: Map<string, number> = new Map();

    public getPaths(): Path[] {
        // 将pathCountMap展开为数组
        const idStr = []
        this.pathCountMap.forEach((value, key) => {
            for (let i = 0; i < value; i++) {
                idStr.push(key)
            }
        })
        if (idStr.length === 0) {
            return [];
        }
        // 随机选3个，因为是三个路径
        const pickset = randomUtil.pickset(idStr, 3);
        const result = []
        pickset.forEach(id => {
            const path = this.pathIdMap.get(id);
            this.pathMap.set(path, this.pathMap.get(path) - 1)
            result.push(path)
        })
        this.resetMap()
        return result;
    }

    public init() {
        this.pathMapBak = cloneDeep(this.pathMap);
        this.resetMap()

    }

    public resetMap() {
        this.pathMap.forEach((value, key) => {
            this.pathIdMap.set(key.id, key);
            this.pathCountMap.set(key.id, value);
        })
    }
}