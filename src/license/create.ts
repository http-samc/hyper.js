import { HyperApiClient, HyperApiResponse } from "../types";

type LicenseBodyCreate = {
    plan: string
    email: string
    key?: string
    metadata?: {
        [key: string]: string
    }
}

/**
 * @description Creates a license, given a plan and email.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/create-license
 * @param client (HyperApiClient) The client to use for the request
 * @param body (LicenseBodyCreate) The body of the license to create
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

let body = {
    plan: "plan-123",
    email: "admin@hyper.co"
}

const res = await License.create(client, body)
```
*/

const create = async (client: HyperApiClient, body: LicenseBodyCreate): Promise<HyperApiResponse> => {
    // TODO: Type guard for body
    let res = await fetch(`https://api.hyper.co/v6/licenses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
        body: JSON.stringify(body)
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[create] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return resJson
}

export default create