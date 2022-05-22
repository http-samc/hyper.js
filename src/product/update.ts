import fetch from 'node-fetch'
import { HyperApiClient, HyperApiResponse, ProductBodyUpdate } from "../types";

/**
 * @description Updates a product, given its id and new value(s).
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/update-product
 * @param client (HyperApiClient) The client to use for the request
 * @param product (string) The id of the product to update
 * @param body (ProductBodyUpdate) An object with the updated key/value pairs provided
 * @returns HyperApiResponse
 * @example
```js
import { Client, Product } from 'hyper'
const client = Hyper('my-api-key')

let product = "my-product-id"

let body = {
    rental_period_days: 10
}

const res = await Product.update(client, product, body)
```
*/

const updateProduct = async (client: HyperApiClient, product: string, body: ProductBodyUpdate): Promise<HyperApiResponse> => {
    if (!product || typeof product !== 'string') {
        throw Error(`link = "${product}" (type ${typeof product}) is not a truthy string.`);
    }
    // TODO: Check body w/ type gaurd
    let res = await fetch(`https://api.hyper.co/v6/product/${product}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[update] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return { ok, ...resJson }
}

export default updateProduct