import fetch from 'node-fetch'
import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Retrieves a payment, given its id.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/retrieve-payment
 * @param client (HyperApiClient) The client to use for the request
 * @param payment (string) The id of the payment to fetch
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Payment from 'hyper/payment'
const client = Hyper('my-api-key')

let payment = "my-payment-id"

const res = await Payment.get(client, payment)
```
*/

const getPayment = async (client: HyperApiClient, payment: string): Promise<HyperApiResponse> => {
    if (!payment || typeof payment !== 'string') {
        throw Error(`payment = "${payment}" (type ${typeof payment}) is not a truthy string.`);
    }
    let res = await fetch(`https://api.hyper.co/v6/payments/${payment}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[get] payment @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return { ok, ...resJson }
}

export default getPayment