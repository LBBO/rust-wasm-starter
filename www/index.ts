// This file just takes care of global imports. Most importantly, the main.ts
// is imported asynchronously so it can use any WASM modules via normal imports
// without generating any errors.
import './index.scss'
import('./main').catch(console.error)
