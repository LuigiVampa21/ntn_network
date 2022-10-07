import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/social-media/models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  @Output() onPostComment = new EventEmitter<{comment:string, postId: number}>()
  
  constructor() { }

  ngOnInit(): void {
  }

  onNewComment(comment:string){
    this.onPostComment.emit({comment, postId: this.post.id})
    
  }
}
