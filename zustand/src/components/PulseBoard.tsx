import { useEffect } from 'react';
import { useStore } from 'zustand';
import { connectPulse, disconnectPulse, pulseStore } from '../pulse-store';

interface PulseBoardProps {
  baseUrl: string;
  token: string;
}

export function PulseBoard({ baseUrl, token }: PulseBoardProps) {
  const status = useStore(pulseStore, (state) => state.status);
  const presenceMembers = useStore(pulseStore, (state) => state.presenceMembers);
  const lastMessage = useStore(pulseStore, (state) => state.lastMessage);

  useEffect(() => {
    connectPulse(baseUrl, token);
    return () => disconnectPulse();
  }, [baseUrl, token]);

  return (
    <section>
      <h2>Pulse Zustand Sample</h2>
      <p>Status: {status}</p>
      <p>Online: {presenceMembers.length}</p>
      <button
        onClick={() =>
          pulseStore.getState().send({
            type: 'update',
            entity: 'document',
            id: 'doc-1',
            patch: { title: 'Edited from Zustand' },
          })
        }
      >
        Emit update
      </button>
      <pre>{JSON.stringify(lastMessage, null, 2)}</pre>
    </section>
  );
}
