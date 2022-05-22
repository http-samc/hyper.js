import fetch from 'node-fetch'
import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Refunds a payment, given its id.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/refund-payment
 * @param client (HyperApiClient) The client to use for the request
 * @param payment (string) The id of the payment to refund
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as Payment from 'hyper/payment'
const client = Hyper('my-api-key')

let payment = "my-payment-id"

const res = await Payment.refund(client, payment)
```
*/

const refundPayment = async (client: HyperApiClient, payment: string): Promise<HyperApiResponse> => {
    if (!payment || typeof payment !== 'string') {
        throw Error(`payment = "${payment}" (type ${typeof payment}) is not a truthy string.`);
    }
    let res = await fetch(`https://api.hyper.co/v6/payments/${payment}/refund`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[refund] payment @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return { ok, ...resJson }
}

export default refundPayment