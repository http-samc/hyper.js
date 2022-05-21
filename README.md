# hyper.js
 A Javascript SDK for Hyper's API

# Demo
```js
import HyperClient, {getLicense} from 'hyper'

const client = HyperClient('1234', console.log)

// Callback
// Ack: (_: HyperApiResponse) => void
getLicense(client, (data: HyperApiResponse) => {
    let foo = document.getElementById("foo")
    foo.innerText = data.ok ? data.username : 'Error'
})

// Async
const res: HyperApiResponse = await getLicense(client)
let foo = document.getElementById("foo")
foo.innerText = res.ok ? res.username : 'Error'
```