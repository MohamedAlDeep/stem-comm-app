/** @type {import('../$types').RequestHandler} */
import { insertDeleted_POST, deleteRow_to_posts, Post_from_id } from '$lib/db.js';
import { API_KEY } from '$env/static/private';

export async function POST({request}) {
    const apiKey = request.headers.get('api-key');
    if (!apiKey || apiKey !== API_KEY) {
        return new Response('Unauthorized', { status: 401 });
    }
    let { id } = await request.json()
    const old = await Post_from_id(id)
    console.log(old)
    await insertDeleted_POST(old.id, old.creator, old.title, old.content, old.date, old.replies_number, old.replies_links, old.date)    
    const res = await deleteRow_to_posts(id)
    return new Response(res.response, {
        headers: { 'Content-Type': 'application/json' },
    });
};