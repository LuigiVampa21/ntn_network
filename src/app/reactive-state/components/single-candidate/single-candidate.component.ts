import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { number } from 'joi';
import { Observable, switchMap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';



@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit {

  loading$!: Observable<boolean>;
candidate$!: Observable<Candidate>;

constructor(private candidateService: CandidateService, private route: ActivatedRoute, private router: Router) { }

ngOnInit(): void {
    this.initObservables();
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidateService.getCandidateByID(+params['id']))
    )
}

private initObservables() {
    this.loading$ = this.candidateService.loading$;
}

onHire(){

};
onRefuse(){

};
onGoBack(){
  this.router.navigateByUrl('/reactive-state/candidates')
};

}
