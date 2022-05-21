import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Retrieves a product, given its name.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/retrieve-product
 * @param client (HyperApiClient) The client to use for the request
 * @param product (string) The key of the license to fetch
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as Product from 'hyper/product'
const client = Hyper('my-api-key')

let product = "my-product"

const res = await Product.get(client, product)
```
*/

const get = async (client: HyperApiClient, product: string): Promise<HyperApiResponse> => {
    if (!product || typeof product !== 'string') {
        throw Error(`license = "${product}" (type ${typeof product}) is not a truthy string.`);
    }
    let res = await fetch(`https://api.hyper.co/v6/products/${product}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        }
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[get] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return resJson
}

export default get