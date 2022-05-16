export interface Post {
    id: number | undefined;
    title: string;
    body: string;
    comments?: Comments[];
}

export interface Comments {
    email: string;
    comment: string;
}
