import { rolldown } from 'rolldown'

const bundle = await rolldown({ input: 'entry.mjs' })
await bundle.write({ dir: 'out', format: 'esm', codeSplitting: false, entryFileNames: 'bundle.mjs' })
