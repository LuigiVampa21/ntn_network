import { trigger, state, style, transition, animate, query, group, animateChild, stagger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [

    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(50, [
            animateChild()
          ])
        ])
      ])
    ]),
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
      transition(':enter', [
        query('.comment-text, .comment-date', [
          animate('500ms', style({
            opacity: 0
          }))
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
              time: '5004ms',
              startColor: 'rgb(201, 157, 242)'
          }
      }),
        group([
          useAnimation(flashAnimation, {
            params: {
                time: '250ms',
                flashColor: 'rgb(249,179,111)'
              }
            }),
          query('.comment-text', [
            animate('250ms', style({
              opacity: 1
            }))
          ]),
          query('.comment-date', [
            animate('500ms', style({
              opacity: 1
            }))
          ])
        ])
      ])
    ]
    )
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
