import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Lists all payments.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/list-payments
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as Payment from 'hyper/payment'
const client = Hyper('my-api-key')

const res = await Payment.list(client)
```
*/

const listPayments = async (client: HyperApiClient): Promise<HyperApiResponse> => {
    let res = await fetch(`https://api.hyper.co/v6/payments`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[list] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return resJson
}

export default listPayments