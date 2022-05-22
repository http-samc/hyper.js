import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Deletes a license, given its key.
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/delete-license
 * @param client (HyperApiClient) The client to use for the request
 * @param license (string) The key of the license to delete
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

let license = "FOO-1111-2222-3333-4444"

const res = await License.destroy(client)
```
*/

const destroyLicense = async (client: HyperApiClient, license: string): Promise<HyperApiResponse> => {
    if (!license || typeof license !== 'string') {
        throw Error(`license = "${license}" (type ${typeof license}) is not a truthy string.`);
    }
    let res = await fetch(`https://api.hyper.co/v6/licenses/${license}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        }
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[delete] license @ ${Date.now().toLocaleString('en-us')}: ${let ok ? 'OK' : 'Error'}`)
    return resJson
}

export default destroyLicense