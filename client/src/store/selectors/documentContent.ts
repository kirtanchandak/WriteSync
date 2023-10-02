import { documentState } from "../atoms/document";
import { selector } from "recoil";

export const documentContentState = selector({
    key: "documentContentState",
    get: ({ get }) => {
        const document = get(documentState);
        return document.content;
    }
})