// TODO: Convert snake_case keys to camelCase within SDK only

// Global Types
interface HyperApiClient {
    apiKey: string
    logger: (msg: string) => void
}

interface HyperApiResponse {
    ok: boolean
    [key: string]: any
}

interface HyperApiPaginatedResponse extends HyperApiResponse {
    next: () => Promise<HyperApiPaginatedResponse>
    previous: () => Promise<HyperApiPaginatedResponse>
}

// License Library Types
type LicenseBodyCreate = {
    plan: string
    email: string
    key?: string
    metadata?: {
        [key: string]: string
    }
}

type LicenseMetadataUpdate = {
    [key: string]: string
}

type LicenseBodyUpdate = {
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

// Link Library Types
type LinkBodyCreate = {
    plan: string // FIXME: This should be called 'product_name' for clarity
    password?: string
    trial_period_days?: number
    group_buy_guild?: string
    enable_bot_protection?: boolean
    max_usages?: number
    start_date?: string
    initial_fee_amount?: number
    // FIXME: Should require for a currency for initial_fee_amount
    // eg. initial_fee: { amount: 10, currency: 'USD' }
}

type LinkBodyUpdate = {
    active?: boolean
    remaining_stock?: number
}

// Product Library Types
type ProductBodyCreate = {
    name: string
    type: "lifetime" | "recurring" | "free" | "rental"
    amount: number
    currency: string // TODO: Type guard for currency
    image?: string
    description?: string
    rental_period_days?: number
    recurring?: { // TODO: Get official documentation for this
        interval: "day" | "week" | "month" | "year"
        interval_count: number
    }
}

type ProductBodyUpdate = {
    name?: string
    image?: string
    description?: string
    rental_period_days?: number
    links?: { title: string, href: string }[]
    transfers?: {
        enabled: boolean
        cooldown_days: number
    }
    integrations?: {
        discord?: {
            roles: string[]
            cancel_action: "kick"
            | "remove_plan_roles"
            | "remove_all_roles"
            | "none"
        }
        telegram?: {
            cancel_action: "kick" | "none"
        }
    }
}

export {
    HyperApiClient,
    HyperApiResponse,
    HyperApiPaginatedResponse,
    LicenseBodyCreate,
    LicenseMetadataUpdate,
    LicenseBodyUpdate,
    LinkBodyCreate,
    LinkBodyUpdate,
    ProductBodyCreate,
    ProductBodyUpdate
}