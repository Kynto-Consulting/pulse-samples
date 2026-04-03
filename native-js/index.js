import { PulseClient } from '@arubiku/pulse-lib';

const baseUrl = process.env.PULSE_BASE_URL || 'http://127.0.0.1:8787';
const token = process.env.PULSE_TOKEN || 'replace-me';

const client = new PulseClient(baseUrl, token, {
  reconnectInterval: 1500,
});

client.on('status', (status) => {
  console.log('[status]', status);
});

client.on('presence', (event) => {
  console.log('[presence]', event);
});

client.on('message', (event) => {
  console.log('[message]', event);
});

client.connect();

setTimeout(() => {
  client.send({
    type: 'update',
    entity: 'brick',
    id: 'native-js-demo',
    patch: { title: 'Update from native JS' },
  });
}, 1000);
