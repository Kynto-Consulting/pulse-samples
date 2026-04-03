# Pulse Samples

![examples](https://img.shields.io/badge/examples-native%20js%20%7C%20server%20%7C%20astro%20%7C%20react%20%7C%20zustand-2563eb)
![package](https://img.shields.io/badge/uses-%40arubiku%2Fpulse--lib-0f172a)

Practical examples for consuming `@arubiku/pulse-lib` and connecting to a deployed `pulse-worker`.

This repo is not a product app. It is a copy-paste friendly reference for different runtime and framework setups.

## Included examples

- `native-js`
  Plain JavaScript client using `PulseClient`.

- `server`
  Backend script that generates JWT tickets using `generatePulseTicket`.

- `astro`
  Astro component using the package in a client-side island style setup.

- `react`
  React component using `usePulse`.

- `zustand`
  Global connection store using `createPulseStore`.

## Prerequisites

You need:

- Node.js 20+
- npm
- a deployed `pulse-worker` URL
- the same `PULSE_SECRET` on the backend side that signs the JWTs

## Install

```bash
cd pulse-samples
npm install
```

All examples consume `@arubiku/pulse-lib` from npm.

## Environment variables

Common variables across examples:

- `PULSE_BASE_URL`
  Worker base URL such as `http://127.0.0.1:8787` or `https://your-worker.workers.dev`

- `PULSE_SECRET`
  Backend signing secret used by the `server` example

- `PULSE_ROOM_ID`
  Shared room used when generating a token

- `PULSE_TOKEN`
  Useful for the `native-js` example if you already generated a token elsewhere

## Recommended flow

1. Deploy `pulse-worker`.
2. Generate a JWT with the `server` sample.
3. Use that token from a client sample.
4. Open the same room in multiple clients.
5. Send updates and watch the broadcast and presence events.

## Example by folder

### `server`

Generates a JWT ticket.

Run it with:

```bash
cd server
node --experimental-strip-types generate-ticket.ts
```

### `native-js`

Minimal browser-like usage with `PulseClient`.

Good when you want to integrate into:

- plain HTML pages
- vanilla JS dashboards
- Alpine.js
- HTMX-enhanced apps
- simple embedded widgets

### `react`

Shows the hook-based API with `usePulse`.

Good when you want component-local connection state.

### `zustand`

Shows how to keep a shared realtime connection in app-level state.

Good when multiple screens or components depend on the same socket.

### `astro`

Shows how to use the package in Astro-oriented frontend code while keeping the realtime logic client-side.

## Relationship between repos

- `pulse-worker`
  Deployable Cloudflare Worker and Durable Object broker.

- `@arubiku/pulse-lib`
  Auth helpers and frontend adapters.

- `pulse-samples`
  Example consumers of that package.

## Typical local workflow

### 1. Start the worker locally

In the worker repo:

```bash
npm run dev
```

### 2. Generate a token

In this repo:

```bash
cd server
node --experimental-strip-types generate-ticket.ts
```

### 3. Use the token in a client example

For example in `native-js` set `PULSE_TOKEN` and run your client harness, or copy the logic into your own app.

## What each sample is teaching

- `native-js`: direct `PulseClient` lifecycle
- `server`: backend-side token generation
- `react`: `usePulse` usage
- `zustand`: shared store connection management
- `astro`: package usage in a hybrid frontend stack

## Troubleshooting

### The server script works but the client gets `Invalid ticket`

The worker secret and the backend signing secret do not match.

### The client connects but no one else receives messages

Make sure every client is using the same `roomId` in the signed ticket.

### React or Zustand imports fail

Run `npm install` at the repo root again and make sure the workspace dependencies are installed.

### Astro example compiles but runtime behavior is missing

Remember the realtime code must run client-side, not only during Astro server rendering.

### Native JS example connects but still looks idle

That usually means:

- wrong worker URL
- expired token
- token for a different room
- no second client in the same room yet

## Next steps

After picking the sample closest to your stack, copy it into your app and replace:

- the worker URL
- the token generation endpoint
- your domain-specific message payloads

## Notes

These examples intentionally stay small. They do not include auth UI, persistence, bundler configuration or a complete application shell.
