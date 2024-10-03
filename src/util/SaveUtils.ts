import {Fight} from "../objs/Fight.ts";

export interface SaveFunction<T> {
    doSave(): string;

    doLoad(dataStr: string): T;

    doLoadByObj(obj: any): T;
}

export const doSave = (logs: string[], fight: Fight): string => {
    const saveObj = new SaveObj();
    Object.assign(saveObj, {logs, fight})
    return saveObj.doSave();
}

export const doLoad = (jsonStr: string): SaveObj => {
    const saveObj = new SaveObj();
    // 这里存在问题，要加载为对象
    const source = JSON.parse(jsonStr);
    Object.assign(saveObj, source)
    saveObj.fight = new Fight().doLoad(JSON.stringify(source.fight))
    return saveObj;
}

export class SaveObj {
    logs: string[] = [];
    fight?: Fight = undefined;

    doSave(): string {
        return JSON.stringify(this)
    }
}