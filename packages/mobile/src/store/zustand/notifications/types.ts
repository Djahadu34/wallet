export interface INotification {
  message: string;
  dapp_url?: string;
  received_at: number;
  icon_url?: string;
  name?: string;
  link?: string;
}

export interface INotificationsStore {
  notifications: INotification[];
  last_seen: number;
  should_show_red_dot: boolean;
  actions: {
    updateLastSeen: () => void;
    addNotification: (notification: INotification) => void;
    reset: () => void;
    deleteNotificationByReceivedAt: (receivedAt: number) => void;
    removeNotificationsByDappUrl: (dapp_url: string) => void;
    removeRedDot: () => void;
  };
}