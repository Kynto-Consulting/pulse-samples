import { usePulse } from '@arubiku/pulse-lib/react';

interface PulsePanelProps {
  baseUrl: string;
  token: string;
}

export function PulsePanel({ baseUrl, token }: PulsePanelProps) {
  const {
    status,
    presenceMembers,
    lastMessage,
    lastPresence,
    send,
  } = usePulse(baseUrl, token, {
    reconnectInterval: 1500,
  });

  return (
    <section>
      <h2>Pulse React Sample</h2>
      <p>Status: {status}</p>
      <p>Connected users: {presenceMembers.length}</p>
      <button
        onClick={() =>
          send({
            type: 'update',
            entity: 'card',
            id: 'card-1',
            patch: { laneId: 'doing' },
          })
        }
      >
        Move card
      </button>
      <pre>{JSON.stringify({ lastPresence, lastMessage }, null, 2)}</pre>
    </section>
  );
}
