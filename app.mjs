import { h1 } from './h1.mjs'
import info from './info.json' with { type: 'json' }
export function run() { import('./lazy.mjs').then((m) => console.log(h1(), info.name, m.default())) }
export function useApp() { return 'app' }
