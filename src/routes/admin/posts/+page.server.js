/** @type {import('./$types.js').PageServerLoad} */
import { getRows } from '$lib/db.js';
export async function load() {
    const posts = await getRows('posts');
    
    return {posts: posts};
};