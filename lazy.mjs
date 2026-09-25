import { useApp } from './app.mjs'
import info from './info.json' with { type: 'json' }
export default () => useApp() + info.name
