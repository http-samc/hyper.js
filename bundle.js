(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
/**
 * @description Creates a {@link HyperApiClient}, given a secret API key
 * @param {string} apiKey A Hyper secret API key
 * @param {(msg: string) => void} [logger] A function to log API calls
 * @example
```js
import { Client } from 'hyper'

// Basic usage
const client = Client('my-api-key')

// Log calls (to console)
const client = Client('my-api-key', console.log)
```
*/
const Client = (apiKey, logger) => {
    return {
        apiKey,
        logger,
    };
};
exports.Client = Client;

},{}],2:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Waitlist = exports.Product = exports.Payment = exports.Link = exports.License = void 0;
const client_1 = require("./client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_1.Client; } });
// Types
__exportStar(require("./types"), exports);
// Individual Libraries
exports.License = require("./license");
exports.Link = require("./link");
exports.Payment = require("./payment");
exports.Product = require("./product");
exports.Waitlist = require("./waitlist");

},{"./client":1,"./license":6,"./link":12,"./payment":16,"./product":21,"./types":24,"./waitlist":26}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
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
import { Client } from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

let body = {
    plan: "plan-123",
    email: "admin@hyper.co"
}

const res = await License.create(client, body)
```
*/
const createLicense = (client, body) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Type guard for body
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/licenses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[create] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = createLicense;

},{"node-fetch":28}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
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
import { Client } from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

let license = "FOO-1111-2222-3333-4444"

const res = await License.destroy(client)
```
*/
const destroyLicense = (client, license) => __awaiter(void 0, void 0, void 0, function* () {
    if (!license || typeof license !== 'string') {
        throw Error(`license = "${license}" (type ${typeof license}) is not a truthy string.`);
    }
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/licenses/${license}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[delete] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = destroyLicense;

},{"node-fetch":28}],5:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Retrieves a license, given its key.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/retrieve-license
 * @param client (HyperApiClient) The client to use for the request
 * @param license (string) The key of the license to fetch
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

let license = "FOO-1111-2222-3333-4444"

const res = await License.get(client, license)
```
*/
const getLicense = (client, license) => __awaiter(void 0, void 0, void 0, function* () {
    if (!license || typeof license !== 'string') {
        throw Error(`license = "${license}" (type ${typeof license}) is not a truthy string.`);
    }
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/licenses/${license}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[get] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = getLicense;

},{"node-fetch":28}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.updateMetadata = exports.list = exports.get = exports.destroy = exports.create = void 0;
const create_1 = require("./create");
exports.create = create_1.default;
const destroy_1 = require("./destroy");
exports.destroy = destroy_1.default;
const get_1 = require("./get");
exports.get = get_1.default;
const list_1 = require("./list");
exports.list = list_1.default;
const update_metadata_1 = require("./update-metadata");
exports.updateMetadata = update_metadata_1.default;
const update_1 = require("./update");
exports.update = update_1.default;

},{"./create":3,"./destroy":4,"./get":5,"./list":7,"./update":9,"./update-metadata":8}],7:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Lists all licenses.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/list-licenses
 * @param limit (number) The maximum number of licenses
 * per page (capped at 100).
 * @param page (number) The page number to fetch.
 * Defaults to 1.
 * @returns HyperApiPaginatedResponse
 * @example
```js
import { Client } from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

// Page 1
const res = await License.list(client)

// Note: HyperApiPaginatedResponse .next() and .previous() return null once you reach a nonexisting page.

// Page 2
res.next()

// Page 1
res.previous()
```
*/
const listLicenses = (client, limit = 20, page = 1) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/licenses?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    let paginatedRes = Object.assign({ next: () => {
            return resJson.has_more
                ? listLicenses(client, limit, page + 1)
                : null;
        }, previous: () => {
            return page - 1 >= 1
                ? listLicenses(client, limit, page - 1)
                : null;
        }, ok }, resJson);
    client.logger && client.logger(`[list] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return paginatedRes;
});
exports.default = listLicenses;

},{"node-fetch":28}],8:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Updates a license's metadata, given its key.
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/update-license-metadata
 * @param client (HyperApiClient) The client to use for the request
 * @param license (string) The key of the license to update
 * @param metadata (LicenseMetadataUpdate) An object with key/value pairs provided,
 * where values are provided only as strings.
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as License from 'hyper/license'
const client = Hyper('my-api-key')

let license = "FOO-1111-2222-3333-4444"

let metadata = {
    foo: 'bar' // values MUST be strings
}

const res = await License.updateMetadata(client, license, metadata)
```
*/
const updateLicenseMetadata = (client, license, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    if (!license || typeof license !== 'string') {
        throw Error(`license = "${license}" (type ${typeof license}) is not a truthy string.`);
    }
    // TODO: Check LicenseMetadata w/ type gaurd
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/licenses/${license}/metadata`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(metadata)
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[patch metadata] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = updateLicenseMetadata;

},{"node-fetch":28}],9:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Updates a license, given its key and new value(s).
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/update-license
 * @param client (HyperApiClient) The client to use for the request
 * @param license (string) The key of the license to update
 * @param body (LicenseBodyUpdate) An object with the updated key/value pairs provided
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
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
const updateLicense = (client, license, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (!license || typeof license !== 'string') {
        throw Error(`license = "${license}" (type ${typeof license}) is not a truthy string.`);
    }
    // TODO: Check body w/ type gaurd
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/licenses/${license}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[update] license @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = updateLicense;

},{"node-fetch":28}],10:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Creates a purchase link, given a product name.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/create-link
 * @param {HyperApiClient} client The client to use for the request
 * @param {ProductBodyCreate} body The body of the product to create
 * @returns {HyperApiResponse}
 * @example
```js
import { Client } from 'hyper'
import * as Link from 'hyper/link'
const client = Hyper('my-api-key')

let body = {
    plan: "my-product-id"
}

const res = await Link.create(client, body)
```
*/
const createLink = (client, body) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Type guard for body
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/links`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[create] link @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = createLink;

},{"node-fetch":28}],11:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
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
const getLink = (client, link) => __awaiter(void 0, void 0, void 0, function* () {
    if (!link || typeof link !== 'string') {
        throw Error(`link = "${link}" (type ${typeof link}) is not a truthy string.`);
    }
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/links/${link}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[get] link @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = getLink;

},{"node-fetch":28}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.list = exports.get = exports.create = void 0;
const create_1 = require("./create");
exports.create = create_1.default;
const get_1 = require("./get");
exports.get = get_1.default;
const list_1 = require("./list");
exports.list = list_1.default;
const update_1 = require("./update");
exports.update = update_1.default;

},{"./create":10,"./get":11,"./list":13,"./update":14}],13:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Lists all links.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/list-links
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Link from 'hyper/link'
const client = Hyper('my-api-key')

const res = await Link.list(client)
```
*/
const listLinks = (client) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/links`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[list] link @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = listLinks;

},{"node-fetch":28}],14:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
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
import { Client } from 'hyper'
import * as Link from 'hyper/link'
const client = Hyper('my-api-key')

let link = "my-link-id"

let body = {
    active: false
}

const res = await Link.update(client, link, body)
```
*/
const updateLink = (client, link, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (!link || typeof link !== 'string') {
        throw Error(`link = "${link}" (type ${typeof link}) is not a truthy string.`);
    }
    // TODO: Check body w/ type gaurd
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/links/${link}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[update] link @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = updateLink;

},{"node-fetch":28}],15:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Retrieves a payment, given its id.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/retrieve-payment
 * @param client (HyperApiClient) The client to use for the request
 * @param payment (string) The id of the payment to fetch
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Payment from 'hyper/payment'
const client = Hyper('my-api-key')

let payment = "my-payment-id"

const res = await Payment.get(client, payment)
```
*/
const getPayment = (client, payment) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payment || typeof payment !== 'string') {
        throw Error(`payment = "${payment}" (type ${typeof payment}) is not a truthy string.`);
    }
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/payments/${payment}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[get] payment @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = getPayment;

},{"node-fetch":28}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refund = exports.list = exports.get = void 0;
const get_1 = require("./get");
exports.get = get_1.default;
const list_1 = require("./list");
exports.list = list_1.default;
const refund_1 = require("./refund");
exports.refund = refund_1.default;

},{"./get":15,"./list":17,"./refund":18}],17:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Lists all payments.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/list-payments
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Payment from 'hyper/payment'
const client = Hyper('my-api-key')

const res = await Payment.list(client)
```
*/
const listPayments = (client) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/payments`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[list] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = listPayments;

},{"node-fetch":28}],18:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Refunds a payment, given its id.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/refund-payment
 * @param client (HyperApiClient) The client to use for the request
 * @param payment (string) The id of the payment to refund
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Payment from 'hyper/payment'
const client = Hyper('my-api-key')

let payment = "my-payment-id"

const res = await Payment.refund(client, payment)
```
*/
const refundPayment = (client, payment) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payment || typeof payment !== 'string') {
        throw Error(`payment = "${payment}" (type ${typeof payment}) is not a truthy string.`);
    }
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/payments/${payment}/refund`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[refund] payment @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = refundPayment;

},{"node-fetch":28}],19:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Creates a product, given a name, subscription type
 * amount, and currency. Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/create-product
 * @param client (HyperApiClient) The client to use for the request
 * @param body (ProductBodyCreate) The body of the product to create
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Product from 'hyper/product'
const client = Hyper('my-api-key')

let body = {
    name: "My Product",
    type: "recurring",
    amount: 100,
    currency: "usd"
}

const res = await Product.create(client, body)
```
*/
const createProduct = (client, body) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Type guard for body
    body.currency = body.currency.toLowerCase(); // TODO: Document currency types & must be lowercase
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/products`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[create] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = createProduct;

},{"node-fetch":28}],20:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Retrieves a product, given its id.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition
 * of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/retrieve-product
 * @param client (HyperApiClient) The client to use for the request
 * @param product (string) The id of the product to fetch
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Product from 'hyper/product'
const client = Hyper('my-api-key')

let product = "my-product-id"

const res = await Product.get(client, product)
```
*/
const getProduct = (client, product) => __awaiter(void 0, void 0, void 0, function* () {
    if (!product || typeof product !== 'string') {
        throw Error(`link = "${product}" (type ${typeof product}) is not a truthy string.`);
    }
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/products/${product}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[get] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = getProduct;

},{"node-fetch":28}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.list = exports.get = exports.create = void 0;
const create_1 = require("./create");
exports.create = create_1.default;
const get_1 = require("./get");
exports.get = get_1.default;
const list_1 = require("./list");
exports.list = list_1.default;
const update_1 = require("./update");
exports.update = update_1.default;
// TODO: Check if the product parameter is the product id or the product name

},{"./create":19,"./get":20,"./list":22,"./update":23}],22:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Lists all products.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/list-products
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Product from 'hyper/product'
const client = Hyper('my-api-key')

const res = await Product.list(client)
```
*/
const listProducts = (client) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/products`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[list] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = listProducts;

},{"node-fetch":28}],23:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Updates a product, given its id and new value(s).
 * Called asynchronously with `await`. All data is provided as-is from the server,
 * with the addition of an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/update-product
 * @param client (HyperApiClient) The client to use for the request
 * @param product (string) The id of the product to update
 * @param body (ProductBodyUpdate) An object with the updated key/value pairs provided
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Product from 'hyper/product'
const client = Hyper('my-api-key')

let product = "my-product-id"

let body = {
    rental_period_days: 10
}

const res = await Product.update(client, product, body)
```
*/
const updateProduct = (client, product, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (!product || typeof product !== 'string') {
        throw Error(`link = "${product}" (type ${typeof product}) is not a truthy string.`);
    }
    // TODO: Check body w/ type gaurd
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/product/${product}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[update] product @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = updateProduct;

},{"node-fetch":28}],24:[function(require,module,exports){
"use strict";
// TODO: Convert snake_case keys to camelCase within SDK only
Object.defineProperty(exports, "__esModule", { value: true });

},{}],25:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
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
import { Client } from 'hyper'
import * as Waitlist from 'hyper/waitlist'
const client = Hyper('my-api-key')

let entry = "my-entry-id"

const res = await Waitlist.get(client, entry)
```
*/
const getWaitlistEntry = (client, entry) => __awaiter(void 0, void 0, void 0, function* () {
    if (!entry || typeof entry !== 'string') {
        throw Error(`entry = "${entry}" (type ${typeof entry}) is not a truthy string.`);
    }
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/waitlist/entries/${entry}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[get] waitlist @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = getWaitlistEntry;

},{"node-fetch":28}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.get = void 0;
const get_1 = require("./get");
exports.get = get_1.default;
const list_1 = require("./list");
exports.list = list_1.default;

},{"./get":25,"./list":27}],27:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
/**
 * @description Lists all waitlist entries.
 * Called asynchronously with `await`. All data is
 * provided as-is from the server, with the addition of
 * an `ok` boolean for error handling.
 * @docs https://docs.hyper.co/reference/list-waitlist-entries
 * @returns HyperApiResponse
 * @example
```js
import { Client } from 'hyper'
import * as Waitlist from 'hyper/waitlist'
const client = Hyper('my-api-key')

const res = await Waitlist.list(client)
```
*/
const listWaitlistEntries = (client) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield (0, node_fetch_1.default)(`https://api.hyper.co/v6/waitlist/entries`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${client.apiKey}`,
            'Content-Type': 'application/json'
        },
    });
    let resJson = yield res.json();
    let ok = res.status.toString().startsWith('2');
    client.logger && client.logger(`[list] waitlist @ ${Date.now().toLocaleString('en-us')}: ${resJson.ok ? 'OK' : 'Error'}`);
    return Object.assign({ ok }, resJson);
});
exports.default = listWaitlistEntries;

},{"node-fetch":28}],28:[function(require,module,exports){
module.exports = exports = window.fetch;
exports.Headers = window.Headers;
exports.Request = window.Request;
exports.Response = window.Response;

},{}]},{},[2]);
