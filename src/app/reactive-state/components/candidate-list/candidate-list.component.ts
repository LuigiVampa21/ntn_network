import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, map, startWith, combineLatest } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { CandidateSearchType } from '../../enum/candidate-search-type.enum'



@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CandidateListComponent implements OnInit {

  isLoading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[];

  constructor(private candidateService: CandidateService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidateService.getCandidatesFromServer();
  }
  
  private initForm(){
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      { value: CandidateSearchType.LASTNAME, label: 'Lastname' },
      { value: CandidateSearchType.FIRSTNAME, label: 'Firstname' },
      { value: CandidateSearchType.COMPANY, label: 'Company' },
    ]
  }

  private initObservables(){
    this.isLoading$ = this.candidateService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value), 
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    )
    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidateService.candidates$
    ]).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType].toLowerCase().includes(search as string))))
  }


}
