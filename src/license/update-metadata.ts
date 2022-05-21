import { HyperApiClient, HyperApiResponse } from "../types";

type LicenseMetadata = {
    [key: string]: string
}

/**
 * @description Updates a license's metadata, given its key.
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/update-license-metadata
 * @param client (HyperApiClient) The client to use for the request
 * @param license (string) The key of the license to update
 * @param metadata (LicenseMetadata) An object with key/value pairs provided,
 * where values are provided only as strings.
 * @returns HyperApiResponse
 * @example
 * ```js
import Hyper from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

let license = "FOO-1111-2222-3333-4444"

let metadata = {
    foo: 'bar' // values MUST be strings
}

const res = await License.updateMetadata(client, license, metadata)
let foo = document.getElementById("foo")
foo.innerText = res.ok ? 'Updated Metadata' : 'Error'
 * ```
 */

const updateMetadata = async (client: HyperApiClient, license: string, metadata: LicenseMetadata): Promise<HyperApiResponse> => {
    if (!license || typeof license !== 'string') {
        throw Error(`license = "${license}" (type ${typeof license}) is not a truthy string.`);
    }
    // TODO: Check LicenseMetadata w/ type gaurd
    let res = await fetch(`https://api.hyper.co/v6/licenses/${license}/metadata`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
        body: JSON.stringify(metadata)
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[patch metadata] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return resJson
}

export default updateMetadata