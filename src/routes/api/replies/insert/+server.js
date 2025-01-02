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
        const res = await insertRow_to_reply(creator, title, content, date, reply_id);
        // Get the original post
        const post = await Post_from_id(res.reply_id);
        // Update the post's replies_links array
        // await updateRow_to_posts(2, "New Title", "New Content", 2, {id: 2, creator: "Mohamed"})
        // console.log(post.id, post.title, post.content, post.replies_number + 1, { id: res.id, creator: res.creator })

        const final = await updateRow_to_posts(post.id, post.title, post.content, post.replies_number + 1, { id: res.id, creator: res.creator });
        console.log(final.response)
        console.log(final.data)
        return new Response(JSON.stringify({ success: true, final }), { status: 200 });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}