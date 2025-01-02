/** @type {import('../$types').RequestHandler} */
import { API_KEY } from '$env/static/private';
import { insertRow_to_users } from '$lib/db.js';

export async function POST({ request }) {
    const apiKey = request.headers.get('api-key');
    if (!apiKey || apiKey !== API_KEY) {
        return new Response('Unauthorized', { status: 401 });
    }
    let response
    let data;
    try {
        data = await request.json();
        if(!data.providor in ['Google', 'Outlook', 'Email']){
            return new Response('Invalid Providor', { status: 400 });
        }
        response = await insertRow_to_users(`${data.username}`, `${data.first_name}`, `${data.last_name}`, `${data.email}`, `${data.providor}`, [Date.now()], [data.labels]);        
    
    } catch (error) {
        return new Response('Invalid JSON', { status: 400 });
    }
    return new Response(JSON.stringify({ message: 'Data inserted successfully', response: response.response, data: response.data}), {
        headers: { 'Content-Type': 'application/json' },
    });
}