import { HyperApiClient, HyperApiResponse, HyperApiPaginatedResponse } from "../types";

/**
 * @description Lists all waitlist entries.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/list-waitlist-entries
 * @param limit (number) The maximum number of entries
 * per page (capped at 100). Defaults to 20.
 * @param page (number) The page number to fetch.
 * Defaults to 1.
 * @returns HyperApiPaginatedResponse
 * @example
```js
import Hyper from 'hyper'
import * as Waitlist from 'hyper/waitlist'
const client = Hyper('my-api-key')

// Page 1
const res = await Waitlist.list(client)

// Note: HyperApiPaginatedResponse .next() and .previous() return null once you reach a nonexisting page.

// Page 2
res.next()

// Page 1
res.previous()
```
*/

const list = async (client: HyperApiClient, limit: number = 20, page: number = 1): Promise<HyperApiPaginatedResponse> => {
    let res = await fetch(`https://api.hyper.co/v6/waitlist/entries?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`
        },
    })
    let resJson: HyperApiResponse = await res.json()
    resJson.ok = res.status.toString().startsWith('2')

    let paginatedRes: HyperApiPaginatedResponse = {
        next: () => {
            return resJson.has_more
                ? list(client, limit, page + 1)
                : null
        },
        previous: () => {
            return page - 1 >= 1
                ? list(client, limit, page - 1)
                : null
        },
        ...resJson
    }

    client.logger && client.logger(`[list] waitlist @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`)
    return paginatedRes
}

export default list