# hyper.js
A Javascript SDK for Hyper's API

## Installation

### Node.js Projects
```
npm install @http-samc/hyper
```

### Web Projects
*Coming soon!*

## Usage

### Client Initialization
The [Hyper API Client](/modules.html#Client) is the default export and needs to be supplied to all calls. It validates and holds your API secret key and an (optional) logger function for development purposes. Import and initialize it as follows:

```js
import { Client } from 'hyper'

const client = Hyper('my-hyper-secret-key')
```

### API Calls
Besides the API Client, each 'category' of endpoints are able to be imported on an as-needed basis via named imports. These are provided as namespaces and their methods correspond to available API calls. You can import them as follows:

```js
import { License, Link, Payment, Product, Waitlist } from 'hyper'

// Use the API by calling the methods of the imported namespaces

// Calls /v6/licenses/{license}
License.get(...)
```

### API Responses
This library is asynchronous, meaning that you'll need to use either `await` or `.then()` to wait for a resolved value. All endpoints return a `Promise` that resolves to a [HyperApiResponse](/interfaces/HyperApiResponse.html). This object contains the response json as-is, straight from the server with the addition of an `ok` boolean property for easy error checking.

Some endpoints resolve to a [HyperApiPaginatedResponse](/interfaces/HyperApiPaginatedResponse.html), a child of [HyperApiResponse](/interfaces/HyperApiResponse.html). This type of response adds intuitive `next()` and `previous()` methods, which can be used to quickly navigate paginated endpoints. They return `null` once you reach a page that doesn't exist, so use the `has_more` property (supplied on all paginated endpoints) and make sure you aren't calling a page less than 1 before calling either method.

## License
This library is open-sourced under an MIT license and was written by [Samarth Chitgopekar](https://smrth.dev). *It is not officially recognized, endorsed, or maintained by Hyper*.
