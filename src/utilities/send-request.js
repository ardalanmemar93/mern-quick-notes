import { getToken } from './users-service'

export default async function sendRequest(url, method = 'GET', payload = null) {
    //Fetch accepts an options object as the second argument
    // used to include a data payload, set headers, specify the method, etc.
    const options = { method }
    if(payload) {
        options.headers = { 'Content-Type': 'application/json' }
        options.body = JSON.stringify(payload)
    }
    const token = getToken();
    if(token) {
        // Need to add an authorization header
        // Use the logical OR assignment operator
        options.headers ||= {};
        // older approach
        // options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`
    }

    console.log({options});

    const res = await fetch(url, options)
    console.log('this is res in sendRequest', res)
    //if res.ok is false then something went wrong
    if(res.ok) return res.json();
    throw new Error('Bad Request');
}