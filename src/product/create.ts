import { HyperApiClient, HyperApiResponse } from "../types";

// TODO: Convert snake_case keys to camelCase within SDK only
type ProductBodyCreate = {
    name: string
    type: "lifetime" | "recurring" | "free" | "rental"
    amount: number
    currency: string // TODO: Type guard for currency
    image?: string
    description?: string
    rental_period_days?: number
}

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
import Hyper from 'hyper'
import * as Product from 'hyper/product'
const client = Hyper('my-api-key')

let body = {
    name: "My Product",
    type: "recurring",
    amount: 100,
    currency: "USD"
}

const res = await Product.create(client, body)
```
*/

const create = async (client: HyperApiClient, body: ProductBodyCreate): Promise<HyperApiResponse> => {
    // TODO: Type guard for body
    let res = await fetch(`https://api.hyper.co/v6/products`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
        body: JSON.stringify(body)
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[create] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return resJson
}

export default create