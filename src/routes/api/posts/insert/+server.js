/** @type {import('../$types').RequestHandler} */
import { API_KEY } from '$env/static/private';
import { insertRow_to_posts } from '$lib/db.js';
import { resolveConfig } from 'vite';

export async function POST({ request }) {
    const apiKey = request.headers.get('api-key');
    if (!apiKey || apiKey !== API_KEY) {
        return new Response('Unauthorized', { status: 401 });
    }
    let response
    let data;
    try {
        data = await request.json();
        
        response = await insertRow_to_posts(`${data.creator}`, `${data.title}`, `${data.content}`, `${Date.now()}`, 0, []);
    } catch (error) {
        return new Response('Invalid JSON', { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'Data inserted successfully', response: response.response, data: response.data}), {
        headers: { 'Content-Type': 'application/json' },
    });
}