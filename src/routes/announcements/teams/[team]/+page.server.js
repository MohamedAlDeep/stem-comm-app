/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { team } = params;
    return { 
        team: team 
    };
};