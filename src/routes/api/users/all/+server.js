/** @type {import('../$types.js').RequestHandler} */
import {API_KEY} from '$env/static/private'


export async function GET({ request, url }) {
    const apiKey = request.headers.get('api-key');
    if (!apiKey || apiKey !== API_KEY) {
        return new Response('Unauthorized', { status: 401 });
    }
    return new Response();
    
};