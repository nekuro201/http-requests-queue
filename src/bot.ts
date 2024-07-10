import http from 'http'

const NUM_REQUESTS = 10

function makeRequest(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    let text = 'hello'

    if (id === 5) {
      text = 'palavrao'
    }

    if (id === 8) {
      text = 'connection-down'
    }

    const data = JSON.stringify({ id, text })

    const options = {
      hostname: 'localhost',
      port: 3334,
      path: '/say-hello',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }

    const req = http.request(options, (res) => {
      res.on('end', () => {
        console.log(data)
        resolve()
      })
    })

    req.on('finish', () => {
      console.log(data)
      resolve()
    })

    req.on('error', (error) => {
      console.error(`Error making request for id:${id}:`, error.message)
      reject(error)
    })

    // Write data to request body
    req.write(data)
    req.end()
  })
}

async function makeMultipleRequests() {
  const requests: Promise<void>[] = []
  for (let i = 0; i < NUM_REQUESTS; i++) {
    requests.push(makeRequest(i))
  }

  try {
    await Promise.all(requests)
    console.log('All requests completed')
    process.exit(0)
  } catch (error) {
    console.error('Error completing requests:', error)
    process.exit(1)
  }
}

makeMultipleRequests()
