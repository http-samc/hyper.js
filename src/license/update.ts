import { HyperApiClient, HyperApiResponse } from "../types";

// TODO: Convert snake_case keys to camelCase within SDK only
type LicenseBody = {
    email?: string
    key?: string
    unlocked?: boolean
    metadata?: {
        [key: string]: string
    }
    subscribtion?: {
        cancel_at_period_end?: boolean
        current_period_end?: string
        pause_collection?: boolean
    }
}

/**
 * @description Updates a license, given its key and new value(s).
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/update-license
 * @param client (HyperApiClient) The client to use for the request
 * @param license (string) The key of the license to update
 * @param body (LicenseBody) An object with the updated key/value pairs provided
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

let license = "FOO-1111-2222-3333-4444"

let body = {
    email: "admin@hyper.co",
    subscription: {
        "cancel_at_period_end": false
    }
}

const res = await License.update(client, license, body)
```
*/

const update = async (client: HyperApiClient, license: string, body: LicenseBody): Promise<HyperApiResponse> => {
    if (!license || typeof license !== 'string') {
        throw Error(`license = "${license}" (type ${typeof license}) is not a truthy string.`);
    }
    // TODO: Check LicenseBody w/ type gaurd
    let res = await fetch(`https://api.hyper.co/v6/licenses/${license}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
        body: JSON.stringify(body)
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[update] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return resJson
}

export default update