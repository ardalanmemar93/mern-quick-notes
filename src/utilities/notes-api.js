import sendRequest from './send-request'
const BASE_URL = '/api/notes'

export async function createNote(noteData) {
    return sendRequest(BASE_URL, 'POST', noteData);
}

export async function getAll() {
    return sendRequest(BASE_URL);
}