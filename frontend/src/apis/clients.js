import axios from 'axios'

export const Learn2Program = axios.create({
    headers: {
        post: { // common to any POST method
          'Content-type': 'application/json',
          "Access-Control-Allow-Origin" : "",        }
    },
    baseURL: 'http://localhost:8080',
    timeout: 60000,
    timeoutErrorMessage: 'Request timed out'
})