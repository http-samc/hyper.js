import fetch from 'node-fetch'
import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Retrieves a product, given its name.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/retrieve-product
 * @param client (HyperApiClient) The client to use for the request
 * @param product (string) The name of the product to fetch
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

const getProduct = async (client: HyperApiClient, product: string): Promise<HyperApiResponse> => {
    if (!product || typeof product !== 'string') {
        throw Error(`link = "${product}" (type ${typeof product}) is not a truthy string.`);
    }
    let res = await fetch(`https://api.hyper.co/v6/products/${product}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[get] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return { ok, resJson }
}

export default getProduct