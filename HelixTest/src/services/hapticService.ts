import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Platform } from 'react-native';

export enum HapticFeedbackType {
  SELECTION = 'selection',
  IMPACT_LIGHT = 'impactLight',
  IMPACT_MEDIUM = 'impactMedium',
  IMPACT_HEAVY = 'impactHeavy',
  NOTIFICATION_SUCCESS = 'notificationSuccess',
  NOTIFICATION_WARNING = 'notificationWarning',
  NOTIFICATION_ERROR = 'notificationError',
  CLICK = 'click',
  DOUBLE_CLICK = 'doubleClick',
  KEYBOARD_TAP = 'keyboardTap',
  CONTEXT_CLICK = 'contextClick',
  KEYBOARD_PRESS = 'keyboardPress',
  KEYBOARD_RELEASE = 'keyboardRelease',
  VIRTUAL_KEY = 'virtualKey',
  VIRTUAL_KEY_RELEASE = 'virtualKeyRelease',
  LONG_PRESS = 'longPress',
  CLOCK_TICK = 'clockTick',
  CALENDAR_DATE = 'calendarDate',
  CONFIRM = 'confirm',
  REJECT = 'reject',
}

class HapticService {
  private static instance: HapticService;
  private options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  public static getInstance(): HapticService {
    if (!HapticService.instance) {
      HapticService.instance = new HapticService();
    }
    return HapticService.instance;
  }

  trigger(type: HapticFeedbackType): void {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger(type as any, this.options);
    }
  }

  triggerSelection(): void {
    this.trigger(HapticFeedbackType.SELECTION);
  }

  triggerImpact(intensity: 'light' | 'medium' | 'heavy' = 'light'): void {
    switch (intensity) {
      case 'light':
        this.trigger(HapticFeedbackType.IMPACT_LIGHT);
        break;
      case 'medium':
        this.trigger(HapticFeedbackType.IMPACT_MEDIUM);
        break;
      case 'heavy':
        this.trigger(HapticFeedbackType.IMPACT_HEAVY);
        break;
    }
  }

  triggerNotification(type: 'success' | 'warning' | 'error'): void {
    switch (type) {
      case 'success':
        this.trigger(HapticFeedbackType.NOTIFICATION_SUCCESS);
        break;
      case 'warning':
        this.trigger(HapticFeedbackType.NOTIFICATION_WARNING);
        break;
      case 'error':
        this.trigger(HapticFeedbackType.NOTIFICATION_ERROR);
        break;
    }
  }

  triggerClick(): void {
    this.trigger(HapticFeedbackType.CLICK);
  }

  triggerLongPress(): void {
    this.trigger(HapticFeedbackType.LONG_PRESS);
  }
}

export const hapticService = HapticService.getInstance();