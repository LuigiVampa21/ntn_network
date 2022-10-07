import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable,map } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    )
  }
  onCatchComment(comment:{comment:string, postId: number}){
      this.postService.addNewComment(comment);    
  }

}
