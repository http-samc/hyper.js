import { HyperApiClient, HyperApiResponse } from "../types";

// TODO: Convert snake_case keys to camelCase within SDK only
type LinkBodyCreate = {
    plan: string // FIXME: This should be called 'product_name' for clarity
    password?: string
    trial_period_days?: number
    group_buy_guild?: string
    enable_bot_protection?: boolean
    max_usages?: number
    start_date?: string
    initial_fee_amount?: number
    // FIXME: Should require for a currency for initial_fee_amount
    // eg. initial_fee: { amount: 10, currency: 'USD' }
}

/**
 * @description Creates a purchase link, given a product name.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/create-link
 * @param client (HyperApiClient) The client to use for the request
 * @param body (ProductBodyCreate) The body of the product to create
 * @returns HyperApiResponse
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

const create = async (client: HyperApiClient, body: LinkBodyCreate): Promise<HyperApiResponse> => {
    // TODO: Type guard for body
    let res = await fetch(`https://api.hyper.co/v6/links`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
        body: JSON.stringify(body)
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[create] link @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return resJson
}

export default create