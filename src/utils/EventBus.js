import { DeviceEventEmitter } from 'react-native';

export default class EventBus{
  constructor() {

  }

  static EVENT_TYPE_TIMESPAN_CHANGE = 'EVENT_TYPE_TIMESPAN_CHANGE';

  static emit(event_type, ...argus) {
    DeviceEventEmitter.emit(event_type, ...argus);
  }

  static on(event_type, handle) {
    return DeviceEventEmitter.addListener(event_type, handle);
  }

  static remove(listener) {
    listener.remove();
  }

}