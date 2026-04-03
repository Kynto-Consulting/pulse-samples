import { generatePulseTicket } from '@arubiku/pulse-lib';

const secret = process.env.PULSE_SECRET || 'super-secret-dev-key';
const baseUrl = process.env.PULSE_BASE_URL || 'http://127.0.0.1:8787';
const roomId = process.env.PULSE_ROOM_ID || 'board-demo';

async function main() {
  const token = await generatePulseTicket({
    roomId,
    userId: 'sample-user',
    secret,
    features: {
      presence: true,
      presenceSync: true,
      selfEcho: false,
    },
    metadata: {
      name: 'Sample User',
      role: 'editor',
    },
    scopes: ['read', 'write'],
    expiresIn: '15m',
  });

  console.log('Worker URL:', baseUrl);
  console.log('Room ID:', roomId);
  console.log('Ticket:', token);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
