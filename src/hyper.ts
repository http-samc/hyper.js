/**
 * @description Creates a {@link HyperApiClient}, given a secret API key
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