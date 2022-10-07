import { Comment } from "src/app/core/models/comment.model";


export class Post {
    id!: number;
    userId!: number;
    title!: string;
    createdDate!: string;
    content!: string;
    comments!: Comment[];
    imageUrl?: string;
}


