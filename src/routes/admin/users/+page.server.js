/** @type {import('./$types.js').PageServerLoad} */
import { getRows } from '$lib/db.js';
export async function load() {
    const users = await getRows('users');
    
    return {users: users};
};