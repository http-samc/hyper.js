import { HyperApiClient, HyperApiResponse, LinkBodyUpdate } from "../types";

/**
 * @description Updates a link, given its id and new value(s).
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/update-link
 * @param client (HyperApiClient) The client to use for the request
 * @param link (string) The id of the link to update
 * @param body (LinkBodyUpdate) An object with the updated key/value pairs provided
 * @returns HyperApiResponse
 * @example
```js
import Hyper from 'hyper'
import * as Link from 'hyper/link'
const client = Hyper('my-api-key')

let link = "my-link-id"

let body = {
    active: false
}

const res = await Link.update(client, link, body)
```
*/

const updateLink = async (client: HyperApiClient, link: string, body: LinkBodyUpdate): Promise<HyperApiResponse> => {
    if (!link || typeof link !== 'string') {
        throw Error(`link = "${link}" (type ${typeof link}) is not a truthy string.`);
    }
    // TODO: Check body w/ type gaurd
    let res = await fetch(`https://api.hyper.co/v6/links/${link}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
        body: JSON.stringify(body)
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[update] link @ ${Date.now().toLocaleString('en-us')}: ${let ok ? 'OK' : 'Error'}`)
    return resJson
}

export default updateLink