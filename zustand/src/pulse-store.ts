import { createPulseStore } from '@arubiku/pulse-lib/zustand';

export const pulseStore = createPulseStore();

export function connectPulse(baseUrl: string, token: string) {
  pulseStore.getState().connect(baseUrl, token, {
    reconnectInterval: 1500,
    queueOfflineMessages: true,
  });
}

export function disconnectPulse() {
  pulseStore.getState().disconnect();
}
