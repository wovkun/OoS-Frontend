import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, Select, Store, ofAction } from '@ngxs/store';
import { Constants, ModeConstants, PaginationConstants } from 'shared/constants/constants';
import { NavBarName } from 'shared/enum/enumUA/navigation-bar';
import { PushNavPath } from 'shared/store/navigation.actions';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { Observable, Subject, distinctUntilChanged, filter, map, takeUntil } from 'rxjs';
import { Direction } from 'shared/models/category.model';
import { DefaultFilterState } from 'shared/models/default-filter-state.model';
import { SetDirections } from 'shared/store/filter.actions';
import { MetaDataState } from 'shared/store/meta-data.state';
// eslint-disable-next-line max-len
import { ProviderState } from 'shared/store/provider.state';
import { NoResultsTitle } from 'shared/enum/enumUA/no-results';
import { Util } from 'shared/utils/utils';
import { ProviderComponent } from '../provider.component';

@Component({
  selector: 'app-provider-study-subjects',
  templateUrl: './provider-study-subjects.component.html',
  styleUrls: ['./provider-study-subjects.component.scss']
})
export class ProviderStudySubjectsComponent extends ProviderComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) public sort: MatSort;

  public readonly constants: typeof Constants = Constants;
  public readonly ModeConstants = ModeConstants;
  public readonly noStudySubjects = NoResultsTitle.noStudySubjects;
  public columns: string[];
  public displayedColumns: string[] = [
    'subj-name',
    'creation-date',
    'last-referred',
    'used-in',
    'teaching-lang-subj-name',
    'teaching-lang',
    'actions'
  ];
  public isLoaded: boolean = false;
  public dataSource: MatTableDataSource<object> = new MatTableDataSource([{}]);
  public dummyData: object[];

  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected store: Store,
    protected matDialog: MatDialog,
    private actions$: Actions,
    private router: Router
  ) {
    super(store, matDialog);
  }

  /**
   * This method sets the navigation path
   */
  public addNavPath(): void {
    this.store.dispatch(
      new PushNavPath({
        name: NavBarName.Subjects,
        isActive: false,
        disable: true
      })
    );
  }

  /**
   * This method should get provider subjects according to the subrole
   */
  public initProviderData(): void {
    this.dummyData = [
      // {
      //   subjName: 'Математика',
      //   teachingLangSubjName: 'Математика',
      //   teachingLang: 'Українська',
      //   creationDate: new Date('2023-09-01'),
      //   lastReferred: new Date('2024-01-15'),
      //   usedIn: 1
      // },
      // {
      //   subjName: 'Фізика',
      //   teachingLangSubjName: 'Physique',
      //   teachingLang: 'Французька',
      //   creationDate: new Date('2023-09-03'),
      //   lastReferred: new Date('2024-02-10'),
      //   usedIn: 2
      // },
      // {
      //   subjName: 'Хімія',
      //   teachingLangSubjName: 'Хімія',
      //   teachingLang: 'Українська',
      //   creationDate: new Date('2023-09-05'),
      //   lastReferred: new Date('2024-01-20'),
      //   usedIn: 3
      // },
      // {
      //   subjName: 'Біологія',
      //   teachingLangSubjName: 'Biologie',
      //   teachingLang: 'Німецька',
      //   creationDate: new Date('2023-09-07'),
      //   lastReferred: new Date('2024-02-05'),
      //   usedIn: 2
      // },
      // {
      //   subjName: 'Історія',
      //   teachingLangSubjName: 'Historia',
      //   teachingLang: 'Іспанська',
      //   creationDate: new Date('2023-09-10'),
      //   lastReferred: new Date('2024-01-25'),
      //   usedIn: 1
      // },
      // {
      //   subjName: 'Географія',
      //   teachingLangSubjName: 'Geographie',
      //   teachingLang: 'Французька',
      //   creationDate: new Date('2023-09-12'),
      //   lastReferred: new Date('2024-02-15'),
      //   usedIn: 1
      // },
      // {
      //   subjName: 'Інформатика',
      //   teachingLangSubjName: 'Informatik',
      //   teachingLang: 'Німецька',
      //   creationDate: new Date('2023-09-15'),
      //   lastReferred: new Date('2024-01-30'),
      //   usedIn: 1
      // },
      // {
      //   subjName: 'Література англійська',
      //   teachingLangSubjName: 'English Literature',
      //   teachingLang: 'Англійська',
      //   creationDate: new Date('2023-09-18'),
      //   lastReferred: new Date('2024-02-20'),
      //   usedIn: 2
      // },
      // {
      //   subjName: 'Мистецтво',
      //   teachingLangSubjName: 'Arte',
      //   teachingLang: 'Іспанська',
      //   creationDate: new Date('2023-09-20'),
      //   lastReferred: new Date('2024-01-10'),
      //   usedIn: 2
      // },
      // {
      //   subjName: 'Економіка',
      //   teachingLangSubjName: 'Wirtschaft',
      //   teachingLang: 'Німецька',
      //   creationDate: new Date('2023-09-22'),
      //   lastReferred: new Date('2024-02-01'),
      //   usedIn: 3
      // }
    ];
    this.dataSource = new MatTableDataSource(this.dummyData);
    console.log('init the data');
    this.isLoaded = true;
  }

  /**
   *   this method should load data about subjects
   */
  private getProvider(): void {
    console.log('loaded the subjects');
  }
}
