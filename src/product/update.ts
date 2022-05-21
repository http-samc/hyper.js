import { HyperApiClient, HyperApiResponse } from "../types";

// TODO: Convert snake_case keys to camelCase within SDK only
type ProductBody = {
    name?: string
    image?: string
    description?: string
    rental_period_days?: number
    links?: { title: string, href: string }[]
    transfers?: {
        enabled: boolean
        cooldown_days: number
    }
    integrations?: {
        discord?: {
            roles: string[]
            cancel_action: "kick"
            | "remove_plan_roles"
            | "remove_all_roles"
            | "none"
        }
        telegram?: {
            cancel_action: "kick" | "none"
        }
    }
}

/**
 * @description Updates a product, given its key and new value(s).
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/update-product
 * @param client (HyperApiClient) The client to use for the request
 * @param product (string) The key of the license to update
 * @param body (ProductBody) An object with the updated key/value pairs provided
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as Product from 'hyper/product'
const client = Hyper('my-api-key')

let product = "my-product"

let body = {
    rental_period_days: 10
}

const res = await Product.update(client, product, body)
```
*/

const update = async (client: HyperApiClient, product: string, body: ProductBody): Promise<HyperApiResponse> => {
    if (!product || typeof product !== 'string') {
        throw Error(`license = "${product}" (type ${typeof product}) is not a truthy string.`);
    }
    // TODO: Check ProductBody w/ type gaurd
    let res = await fetch(`https://api.hyper.co/v6/product/${product}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
        body: JSON.stringify(body)
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[update] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return resJson
}

export default update