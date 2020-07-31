import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationTypeEnum, NotificationButtonInterface } from 'src/app/common/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() type: NotificationTypeEnum;
  @Input() value: string;
  @Input() button: NotificationButtonInterface;
  @Output() action: EventEmitter<string> = new EventEmitter();

  buttonClick() {
    this.action.emit(this.button.action);
  }
}

