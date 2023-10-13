import { DocumentData } from "firebase-admin/firestore";

export interface User {
    id: string;
}

export const mapUserFromDb = (data: DocumentData) => {
    return {
        id: data.id,
    };
};
