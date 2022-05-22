import { HyperApiClient } from "./types"

/**
 * @description Creates a {@link HyperApiClient}, given a secret API key
 * @param {string} apiKey A Hyper secret API key
 * @param {(msg: string) => void} [logger] A function to log API calls
 * @example
```js
import Hyper from 'hyper'

// Basic usage
const client = Hyper('my-api-key')

// Log calls (to console)
const client = Hyper('my-api-key', console.log)
```
*/
const Hyper = (apiKey: string, logger?: (msg: string) => void): HyperApiClient => {
    return {
        apiKey,
        logger,
    }
}

export default Hyper