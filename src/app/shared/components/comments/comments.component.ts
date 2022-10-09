import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        backgroundColor: 'white',
        zIndex: 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        backgroundColor: 'rgba(201, 157, 242)',
        zIndex: 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out'),
      ]),
      transition('active => default', [
        animate('500ms ease-in-out'),
      ]),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          backgroundColor: 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
          transform:'translateX(0)',
          opacity: 1,
          backgroundColor:'white'
        }))
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Output() newComment = new EventEmitter<string>();
  @Input() comments!: Comment[];

  commentCtrl!: FormControl;
  animationState: {[key: number]: 'default' | 'active' } = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    for (let index in this.comments){
      this.animationState[index] = 'default'
    }
  }

  onLeaveComment(){
    if(!this.commentCtrl.value) return;
    const maxID = Math.max(...this.comments.map(c => c.id));
    this.comments.unshift({
      id: maxID + 1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
    console.log(this.comments);
    
  }

  onListItemMouseEnter(i:number){
    this.animationState[i] = 'active';
  }
  
  onListItemMouseLeave(i:number){
    this.animationState[i] = 'default';
  }

}
