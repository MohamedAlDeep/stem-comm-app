/** @type {import('./$types.js').PageServerLoad} */
import { getRows } from '$lib/db.js';
export async function load() {
    const replies = await getRows('replies');
    // console.log(replies);
    return {replies: replies};
};