import { HyperApiClient } from "./types"

/**
 * @description Creates a {@link HyperApiClient}, given an API key
 * @param apiKey (string) The API key to use for the client
 * @param logger (function) A function to call for logging messages
 * @example
```js
import Hyper from 'hyper'

// Basic usage
const client = Hyper('my-api-key')

// Log calls (to console)
const client = Hyper('my-api-key', console.log)
```
*/
class Hyper {
    apiKey: string
    logger: (msg: string) => void = () => { }

    constructor(apiKey: string, logger?: (msg: string) => void) {
        this.apiKey = apiKey
        if (logger) {
            this.logger = logger
        }
    }
}
export default Hyper