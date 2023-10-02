import { documentState } from "../atoms/document";
import { selector } from "recoil";

export const documentTitleState = selector({
    key: "documentTitleState",
    get: ({ get }) => {
        const document = get(documentState);
        return document.title;
    }
})