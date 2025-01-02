<script>
    import { searchTerm, filteredUsers, filterUsers } from '$lib/store.js';
    export let data;

    // Watch for changes in searchTerm and filter users accordingly
    $: filterUsers(data.users, $searchTerm);
</script>



<input type="text" placeholder="Search..." bind:value={$searchTerm} />
