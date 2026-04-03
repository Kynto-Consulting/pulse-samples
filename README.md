# Pulse Samples

Ejemplos mínimos para consumir `pulse-lib` y conectar contra `pulse-worker`.

## Estructura

- `native-js/index.js`: cliente JS puro consumiendo `pulse-lib` instalado.
- `server/generate-ticket.ts`: ejemplo para backend Node/Bun que emite un ticket JWT.
- `astro/src/components/PulseBoard.astro`: cliente Astro usando `PulseClient` vanilla.
- `react/src/components/PulsePanel.tsx`: integración con `usePulse`.
- `zustand/src/pulse-store.ts`: store global con `createPulseStore`.
- `zustand/src/components/PulseBoard.tsx`: componente React consumiendo el store de Zustand.

## Variables esperadas

- `PULSE_BASE_URL`: URL del worker, por ejemplo `http://127.0.0.1:8787` o tu dominio productivo.
- `PULSE_SECRET`: secreto compartido usado por el backend para firmar tickets.
- `PULSE_ROOM_ID`: sala o board a sincronizar.

## Flujo recomendado

1. El backend genera un ticket con `generatePulseTicket`.
2. El frontend abre `wss://.../ws?token=...` usando `PulseClient`, `usePulse` o `createPulseStore`.
3. El worker enruta por `roomId` y emite mensajes de estado/presencia.

## Instalacion local de samples

```bash
cd pulse-samples
npm install
```

Cada sample consume `@arubiku/pulse-lib` desde npm en la version `^1.0.0`.

## Notas

- Estos samples no son apps completas; son referencias listas para copiar dentro de un proyecto real.
- `pulse-lib` ya expone entrypoints separados para `react`, `zustand`, `protocol` y `store`.
