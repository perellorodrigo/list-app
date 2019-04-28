export interface NotificationPreference{
    id: number;
    isEnabled: boolean;
    triggerIn: number;
    triggerBefore: boolean;
    triggerAfter: boolean;
    message: string
}