import { Component, HostListener, OnInit, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication.service';
import { Router } from '@angular/router';
import { Menu } from './menu';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from './menu-item';
import { isNullOrUndefined } from 'util';
import { ErrorNotificationService } from 'app/core/error-notification.service';
import { User } from 'app/models/user';
import { AlertConfig, AlertService } from 'app/shared/services/alert.service';

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
    public currentUser: User;
    public sidenavMode: string;
    public sidenavOpened: boolean;
    public showToolbar = true;
    public onlyTopMenu = false;

    loginUsername: string;
    menuItems: MenuItem[];

    private widthObservable: BehaviorSubject<number>;

    private changeModeWidth = 1024;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private errorService: ErrorNotificationService,
        private _zone: NgZone,
        public dialog: MatDialog,
        private alertService: AlertService) {
        this.errorService.onError(e => {
            if (e.body !== null) {
                this.showError(isNullOrUndefined(e.body) ? e : e.body);
            }
        });
    }

    ngOnInit() {
        this.menuItems = Menu.getItems(this.authService.session.user);

        this.currentUser = this.authService.session.user;

        if (this.currentUser) {
            this.loginUsername = this.currentUser.name;
        }

        this.widthObservable = new BehaviorSubject<number>(this.windowWidth);

        this.widthObservable
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(width => {
                if (width <= this.changeModeWidth) {
                    this.sidenavMode = 'over';
                    this.sidenavOpened = false;
                } else {
                    this.sidenavMode = 'side';
                    this.sidenavOpened = true;
                }
            });
    }

    goToMainPage() {
        if (!this.authService.isAuthenticated) {
            this.router.navigate(['/auth/login']);
            return;
        }

        const route = this.authService.session.user.isAdmin ? '/ideas' : '/cars'
        this.router.navigate([route]);
    }

    componentAdded(component: any) {
        if (!component || !component.fullscreen) {
            return;
        }
        component.fullscreen
            .subscribe(fullscreen => {
                if (fullscreen) {
                    this.hideMenus();
                    return;
                }
                this.showMenus();
            });
    }

    showMenus() {
        this.sidenavOpened = true;
        this.showToolbar = true;
    }

    hideMenus() {
        this.sidenavOpened = false;
        this.showToolbar = false;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.widthObservable.next(event.target.innerWidth);
    }

    public logout() {
        this.authService.logout();
    }

    private get windowWidth() {
        return window.innerWidth;
    }

    private showError(error: any) {
        let message = '';

        if (typeof error === 'string') {
            message = error;
        } else {
            if (error instanceof Error) {
                message = error.message;
            } else {
                for (const fieldName in error) {
                    if (error.hasOwnProperty(fieldName)) {
                        message += `${error[fieldName]}; `;
                    }
                }
            }
        }

        if (message === '') {
            message = 'Internal error occurred. Please contact your administrator, if it occurs again.';
        }

        const snackBarRef = this.alertService.showError(message);

        setTimeout(() => {
            this._zone.run(() => {
                snackBarRef.dismiss();
            });
        }, AlertConfig.defaultDuration);
    }
}
