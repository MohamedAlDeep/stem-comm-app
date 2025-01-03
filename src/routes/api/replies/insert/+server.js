import { insertRow_to_reply, Post_from_id, updateRow_to_posts } from '$lib/db.js';
import { API_KEY } from '$env/static/private';

/** @type {import('../$types').RequestHandler} */
export async function POST({ request }) {
    const apiKey = request.headers.get('api-key');
    if (apiKey !== API_KEY) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { creator, title, content, date, reply_id} = await request.json();

    

    try {
        // Insert the reply
        const res = await insertRow_to_reply(creator, title, content, new Date(), reply_id);
        // Get the original post
        
        const post = await Post_from_id(res.reply_id);
        const final = await updateRow_to_posts(post.id, post.title, post.content, post.replies_number + 1, { id: res.id, creator: res.creator });
        return new Response({ success: true, final }, { status: 200 });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}