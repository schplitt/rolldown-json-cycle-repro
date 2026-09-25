import { h1 } from './h1.mjs'
import info from './info.json' with { type: 'json' }
export function useApp() { return 'app' }
console.log(h1(), info.name, (await import('./lazy.mjs')).default())
