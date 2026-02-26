import { NotificationType } from "./enums";

export interface Notification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    is_read: boolean;
    type: NotificationType;
    created_at: string;
}

export interface NotificationStats {
    total: number;
    unread: number;
}
