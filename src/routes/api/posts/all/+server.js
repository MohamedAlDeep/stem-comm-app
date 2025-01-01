/** @type {import('../$types').RequestHandler} */
import { getRows } from '$lib/db.js';
import { API_KEY } from '$env/static/private';

export async function GET({request}) {
    const apiKey = request.headers.get('api-key');
    if (!apiKey || apiKey !== API_KEY) {
        return new Response('Unauthorized', { status: 401 });
    }
    
    return new Response(JSON.stringify(await getRows('posts')), {
        headers: { 'Content-Type': 'application/json' },
    });
};