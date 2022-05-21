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

export { HyperApiClient, HyperApiResponse, HyperApiPaginatedResponse }