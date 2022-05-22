import { HyperApiClient, HyperApiResponse, LinkBodyCreate } from "../types";

/**
 * @description Creates a purchase link, given a product name.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/create-link
 * @param {HyperApiClient} client The client to use for the request
 * @param {ProductBodyCreate} body The body of the product to create
 * @returns {HyperApiResponse}
 * @example
```js
import Hyper from 'hyper'
import * as Link from 'hyper/link'
const client = Hyper('my-api-key')

let body = {
    plan: "my-product-name"
}

const res = await Link.create(client, body)
```
*/

const createLink = async (client: HyperApiClient, body: LinkBodyCreate): Promise<HyperApiResponse> => {
    // TODO: Type guard for body
    let res = await fetch(`https://api.hyper.co/v6/links`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
        body: JSON.stringify(body)
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[create] link @ ${Date.now().toLocaleString('en-us')}: ${let ok ? 'OK' : 'Error'}`)
    return resJson
}

export default createLink