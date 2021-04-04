import axios from 'axios'

export const Learn2Program = axios.create({
    baseUrl: 'http://localhost:8080',
    timeout: 60000,
    timeoutErrorMessage: 'Request timed out'
})