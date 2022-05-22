import fetch from 'node-fetch'
import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Retrieves a waitlist entry, given its id.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/retrieve-waitlist-entry
 * @param client (HyperApiClient) The client to use for the request
 * @param entry (string) The id of the entry to fetch
 * @returns HyperApiResponse
 * @example
```js
import { Client, Waitlist } from 'hyper'
const client = Hyper('my-api-key')

let entry = "my-entry-id"

const res = await Waitlist.get(client, entry)
```
*/

const getWaitlistEntry = async (client: HyperApiClient, entry: string): Promise<HyperApiResponse> => {
    if (!entry || typeof entry !== 'string') {
        throw Error(`entry = "${entry}" (type ${typeof entry}) is not a truthy string.`);
    }
    let res = await fetch(`https://api.hyper.co/v6/waitlist/entries/${entry}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[get] waitlist @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return { ok, ...resJson }
}

export default getWaitlistEntry