export interface IComment {
    _id: string;
    body: {
        username: string;
        content: string;
    };
    likes: string[];
    postId: string;
    created_at: string;
}
