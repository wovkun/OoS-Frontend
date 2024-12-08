import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { PersonalCabinetTitle } from 'shared/enum/enumUA/navigation-bar';
import { RoleLinks } from 'shared/enum/enumUA/user';
import { Role } from 'shared/enum/role';
import { ApplicationStatuses } from 'shared/enum/statuses';
import { Application } from 'shared/models/application.model';
import { SearchResponse } from 'shared/models/search.model';
import { NavigationBarService } from 'shared/services/navigation-bar/navigation-bar.service';
import { ChatState } from 'shared/store/chat.state';
import { AddNavPath, DeleteNavPath } from 'shared/store/navigation.actions';
import { GetPendingApplicationsByProviderId } from 'shared/store/provider.actions';
import { ProviderState } from 'shared/store/provider.state';
import { RegistrationState } from 'shared/store/registration.state';
import { isRoleAdmin } from 'shared/utils/admin.utils';
import { isRoleProvider } from 'shared/utils/provider.utils';

@Component({
  selector: 'app-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.scss']
})
export class PersonalCabinetComponent implements OnInit, OnDestroy {
  @Select(ProviderState.pendingApplications)
  public pendingApplications$: Observable<SearchResponse<Application[]>>;
  @Select(ChatState.unreadMessagesCount)
  public unreadMessagesCount$: Observable<number>;

  public readonly ApplicationStatuses = ApplicationStatuses;
  public readonly RoleLinks = RoleLinks;
  public readonly Role = Role;
  public readonly isRoleAdmin = isRoleAdmin;
  public readonly isRoleProvider = isRoleProvider;

  public personalCabinetTitle: PersonalCabinetTitle;
  public userRole: Role;

  constructor(
    private store: Store,
    public navigationBarService: NavigationBarService
  ) {}

  public ngOnInit(): void {
    this.userRole = this.store.selectSnapshot<Role>(RegistrationState.role);
    this.personalCabinetTitle = PersonalCabinetTitle[this.userRole];

    this.store.dispatch(
      new AddNavPath(
        this.navigationBarService.createOneNavPath({
          path: '/personal-cabinet/config',
          name: this.personalCabinetTitle,
          isActive: false,
          disable: false
        })
      )
    );

    if (isRoleProvider(this.userRole)) {
      const providerId = this.store.selectSnapshot(RegistrationState.provider).id;
      this.store.dispatch(new GetPendingApplicationsByProviderId(providerId));
    }
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new DeleteNavPath());
  }
}
