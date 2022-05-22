# @http-samc/hyper

## Table of contents

### Namespaces

- [License](undefined)
- [Link](undefined)
- [Payment](undefined)
- [Product](undefined)
- [Waitlist](undefined)

### Interfaces

- [HyperApiClient](undefined)
- [HyperApiPaginatedResponse](undefined)
- [HyperApiResponse](undefined)

### Type aliases

- [LicenseBodyCreate](undefined)
- [LicenseBodyUpdate](undefined)
- [LicenseMetadataUpdate](undefined)
- [LinkBodyCreate](undefined)
- [LinkBodyUpdate](undefined)
- [ProductBodyCreate](undefined)
- [ProductBodyUpdate](undefined)

### Functions

- [Client](undefined)

## Namespaces

### License

• **License**: Namespace License

#### Defined in

[license/index.ts:1](https://github.com/http-samc/hyper.js/blob/affba99/src/license/index.ts#L1)

___

### Link

• **Link**: Namespace Link

#### Defined in

[link/index.ts:1](https://github.com/http-samc/hyper.js/blob/affba99/src/link/index.ts#L1)

___

### Payment

• **Payment**: Namespace Payment

#### Defined in

[payment/index.ts:1](https://github.com/http-samc/hyper.js/blob/affba99/src/payment/index.ts#L1)

___

### Product

• **Product**: Namespace Product

#### Defined in

[product/index.ts:1](https://github.com/http-samc/hyper.js/blob/affba99/src/product/index.ts#L1)

___

### Waitlist

• **Waitlist**: Namespace Waitlist

#### Defined in

[waitlist/index.ts:1](https://github.com/http-samc/hyper.js/blob/affba99/src/waitlist/index.ts#L1)

## Interfaces

### HyperApiClient

• **HyperApiClient**: Interface HyperApiClient

#### Defined in

[types.ts:4](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L4)

___

### HyperApiPaginatedResponse

• **HyperApiPaginatedResponse**: Interface HyperApiPaginatedResponse

#### Defined in

[types.ts:14](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L14)

___

### HyperApiResponse

• **HyperApiResponse**: Interface HyperApiResponse

#### Defined in

[types.ts:9](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L9)

## Type aliases

### LicenseBodyCreate

Ƭ **LicenseBodyCreate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `email` | string |
| `key?` | string |
| `metadata?` | Object |
| `plan` | string |

#### Defined in

[types.ts:20](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L20)

___

### LicenseBodyUpdate

Ƭ **LicenseBodyUpdate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `email?` | string |
| `key?` | string |
| `metadata?` | Object |
| `subscribtion?` | Object |
| `subscribtion.cancel_at_period_end?` | boolean |
| `subscribtion.current_period_end?` | string |
| `subscribtion.pause_collection?` | boolean |
| `unlocked?` | boolean |

#### Defined in

[types.ts:33](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L33)

___

### LicenseMetadataUpdate

Ƭ **LicenseMetadataUpdate**: Object

#### Index signature

▪ [key: string]: string

#### Defined in

[types.ts:29](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L29)

___

### LinkBodyCreate

Ƭ **LinkBodyCreate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enable_bot_protection?` | boolean |
| `group_buy_guild?` | string |
| `initial_fee_amount?` | number |
| `max_usages?` | number |
| `password?` | string |
| `plan` | string |
| `start_date?` | string |
| `trial_period_days?` | number |

#### Defined in

[types.ts:48](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L48)

___

### LinkBodyUpdate

Ƭ **LinkBodyUpdate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `active?` | boolean |
| `remaining_stock?` | number |

#### Defined in

[types.ts:61](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L61)

___

### ProductBodyCreate

Ƭ **ProductBodyCreate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | number |
| `currency` | string |
| `description?` | string |
| `image?` | string |
| `name` | string |
| `recurring?` | Object |
| `recurring.interval` | "day" \| "week" \| "month" \| "year" |
| `recurring.interval_count` | number |
| `rental_period_days?` | number |
| `type` | "lifetime" \| "recurring" \| "free" \| "rental" |

#### Defined in

[types.ts:67](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L67)

___

### ProductBodyUpdate

Ƭ **ProductBodyUpdate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description?` | string |
| `image?` | string |
| `integrations?` | Object |
| `integrations.discord?` | Object |
| `integrations.discord.cancel_action` | "kick" \| "remove\_plan\_roles" \| "remove\_all\_roles" \| "none" |
| `integrations.discord.roles` | string[] |
| `integrations.telegram?` | Object |
| `integrations.telegram.cancel_action` | "kick" \| "none" |
| `links?` | Object[] |
| `name?` | string |
| `rental_period_days?` | number |
| `transfers?` | Object |
| `transfers.cooldown_days` | number |
| `transfers.enabled` | boolean |

#### Defined in

[types.ts:81](https://github.com/http-samc/hyper.js/blob/affba99/src/types.ts#L81)

## Functions

### Client

▸ **Client**(`apiKey`, `logger?`): HyperApiClient

**`description`** Creates a {@link HyperApiClient}, given a secret API key

**`example`**
```js
import { Client } from 'hyper'

// Basic usage
const client = Client('my-api-key')

// Log calls (to console)
const client = Client('my-api-key', console.log)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiKey` | string | A Hyper secret API key |
| `logger?` | Function | - |

#### Returns

HyperApiClient

#### Defined in

[client.ts:18](https://github.com/http-samc/hyper.js/blob/affba99/src/client.ts#L18)
