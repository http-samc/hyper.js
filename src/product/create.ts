import fetch from 'node-fetch'
import { HyperApiClient, HyperApiResponse, ProductBodyCreate } from "../types";

/**
 * @description Creates a product, given a name, subscription type
 * amount, and currency. Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/create-product
 * @param client (HyperApiClient) The client to use for the request
 * @param body (ProductBodyCreate) The body of the product to create
 * @returns HyperApiResponse
 * @example
```js
import { Client, Product } from 'hyper'
const client = Hyper('my-api-key')

let body = {
    name: "My Product",
    type: "recurring",
    amount: 100,
    currency: "usd"
}

const res = await Product.create(client, body)
```
*/

const createProduct = async (client: HyperApiClient, body: ProductBodyCreate): Promise<HyperApiResponse> => {
    // TODO: Type guard for body
    body.currency = body.currency.toLowerCase() // TODO: Document currency types & must be lowercase
    let res = await fetch(`https://api.hyper.co/v6/products`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[create] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return { ok, ...resJson }
}

export default createProduct