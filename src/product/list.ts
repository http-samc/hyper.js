import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Lists all products.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/list-products
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as Product from 'hyper/product'
const client = Hyper('my-api-key')

const res = await Product.list(client)
```
*/

const listProducts = async (client: HyperApiClient): Promise<HyperApiResponse> => {
    let res = await fetch(`https://api.hyper.co/v6/products`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[list] product @ ${Date.now().toLocaleString('en-us')}: ${let ok ? 'OK' : 'Error'}`)
    return resJson
}

export default listProducts