import {notification} from 'ant-design-vue';

export interface notifyPushConfig {
  type?: notifyType;
  message: string;
  description?: string;
  duration?: number;
  onClick?: () => void;
  onClose?: () => void;
}

export enum notifyType {
  open = 'open',
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning',
}

export function notifyPush(config: notifyPushConfig) {
  notification[config.type ?? notifyType.open]({
      key: new Date().getTime().toString(),
      message: config.message,
      description: config.description ?? undefined,
      placement: 'bottomLeft',
      duration: config.duration ?? 3,
      onClick: config.onClick ?? undefined,
      onClose: config.onClose ?? undefined,
    }
  );
}

export function notifyPushError() {
  notifyPush({
    type: notifyType.error,
    message: "操作失敗",
    description: "請稍後再試或告知開發人員",
  });
}
