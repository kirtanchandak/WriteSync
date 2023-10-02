import { atom } from "recoil";

export const documentState = atom({
    key: "documentState", 
    default: {
        title: null as null | string, 
        content: null as null | string,
    }
})