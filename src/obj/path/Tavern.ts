import Path from "./Path.ts";
import people from "../People.ts";

export default class Tavern extends Path {
    nameStr(): string {
        return super.nameStr() + "酒馆";
    }

    peopleList: people[] = []


}