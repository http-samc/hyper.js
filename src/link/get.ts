import fetch from 'node-fetch'
import { HyperApiClient, HyperApiResponse } from "../types";

/**
 * @description Retrieves a link, given its id.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/retrieve-link
 * @param client (HyperApiClient) The client to use for the request
 * @param link (string) The id of the link to fetch
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Link from 'hyper/link'
const client = Hyper('my-api-key')

let link = "my-link-id"

const res = await Product.get(client, link)
```
*/

const getLink = async (client: HyperApiClient, link: string): Promise<HyperApiResponse> => {
    if (!link || typeof link !== 'string') {
        throw Error(`link = "${link}" (type ${typeof link}) is not a truthy string.`);
    }
    let res = await fetch(`https://api.hyper.co/v6/links/${link}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    let resJson: { [key: string]: any } = await res.json()
    let ok = res.status.toString().startsWith('2')

    client.logger && client.logger(`[get] link @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return { ok, ...resJson }
}

export default getLink