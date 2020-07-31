import { Subscriptions } from './subscriptions';
import { StateService } from './state-service';
import { ResponseHandler } from './response-handler';

export class Notification extends Subscriptions {
  notification: string;
  notificationType: NotificationTypeEnum;
  button: NotificationButtonInterface;

  constructor(private stateService: StateService,
              private handler: ResponseHandler) {
    super();
    this.subscriptions.push(stateService.loader$.subscribe(
      loader => this.updateNotification(loader ? NotificationTypeEnum.Loader : NotificationTypeEnum.None)
    ));

    this.subscriptions.push(stateService.error$.subscribe(
      error => this.updateNotification(error ? NotificationTypeEnum.Error : NotificationTypeEnum.None, error)
    ));
  }

  notificationAction(type: string) {
    if (type === NotificationActions.Reload) {
      this.handler.reload();
    }
  }

  updateNotification(type: NotificationTypeEnum, value: any = null, button: NotificationButtonInterface = null) {
    this.notificationType = type;
    if (type === NotificationTypeEnum.Error) {
      this.notification = value.value;
      this.button = {
        icon: 'refresh',
        text: 'Try Again',
        action: NotificationActions.Reload
      };
    } else {
      this.button = button;
      this.notification = value;
    }
  }
}

export class NotificationActions {
    static Reload = 'reload';
}

export enum NotificationTypeEnum {
    None,
    Notification,
    Error,
    Loader
}
  
export interface NotificationButtonInterface {
    icon?: string;
    text?: string;
    action?: string;
}