export type AlertType = 'success' | 'info' | 'warning' | 'danger';
export class Alert {
  public type?: AlertType;
  public title?: string;
  public message?: string;
};