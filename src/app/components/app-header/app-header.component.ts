import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/auth/shared/models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit {
    @Input() user: User;
    @Output() logout = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    logoutUser() {
        this.logout.emit();
    }
}
