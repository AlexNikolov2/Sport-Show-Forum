import { IUser } from "./user";
import { IComment } from "./comment";

export interface IPost {
    keyword: string;
    title: string;
    content: string;
    _id: string;
    user: IUser;
    img?: string;
    likes: string[];
    comments: IComment[];
    created_at: string;
    updatedAt: string;
}
