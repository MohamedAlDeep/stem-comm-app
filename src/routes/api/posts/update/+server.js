/** @type {import('../$types').RequestHandler} */
import { updateRow_to_posts_FROM_POSTS, Post_from_id } from '$lib/db.js';
import { API_KEY } from '$env/static/private';

export async function POST({request}) {
    const apiKey = request.headers.get('api-key');
    if (!apiKey || apiKey !== API_KEY) {
        return new Response('Unauthorized', { status: 401 });
    }
    let data = await request.json()
    let old = await Post_from_id(data.id)
    console.log(old)
    if(!data.replies_links){
        data.replies_links = old.replies_links
    }
    if(!data.replies_number){
        data.replies_number = old.replies_number
    }
    if(!data.title){
        data.title = old.title
    }
    if(!data.content){
        data.content = old.content
    }
    if(!data.creator){
        data.creator = old.creator
    }
    // creator: any, title: any, content: any, replies_number: any, replies_links: any
    let res  = await updateRow_to_posts_FROM_POSTS(data.creator, data.title, data.content, data.replies_number, data.replies_links, data.id)
  
    return new Response(res, {
        headers: { 'Content-Type': 'application/json' },
    });
};