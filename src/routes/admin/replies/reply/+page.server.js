/** @type {import('./$types').PageServerLoad} */
import { Reply_from_id } from '$lib/db.js';

export async function load({ url }) {
    const searchTerm = url.searchParams.get('id') || '';
    const reply = await Reply_from_id(searchTerm);

    // console.log(reply);
    return { reply: reply.data};
}