import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
    @Input() item: any;
    @Output() remove = new EventEmitter<any>();
    toggled = false;

    constructor() { }

    ngOnInit(): void {
    }

    toggle() {
        this.toggled = !this.toggled;
    }

    getRoute(item: any) {
        return [`../meals`, item.id];
    }

    removeItem() {
        this.remove.emit(this.item);
    }
}
