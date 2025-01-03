import { Post_from_id } from '$lib/db.js';

export async function load({ params }) {
    const { id } = params;

    const post = await Post_from_id(parseInt(id));
   
    return {
        data: post
    };
}