import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Post } from "../models/post.model";
import { environment } from "../../../environments/environment";



@Injectable()

export class PostService {
    constructor(private http: HttpClient){}


    getPosts(): Observable<Post[]>{
        return this.http.get<Post[]>(`${environment.apiURL}/posts`)
    }

    addNewComment(postCommented: { comment: string, postId: number }) {
        console.log(postCommented);
    }
}