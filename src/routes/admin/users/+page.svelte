<script>
    export let data
</script>


<h1>Users</h1>
<h2>Links</h2>

<a href="/">Home</a>
<a href="/admin">Admin Panel</a>
{#if data.users.length == 0}
<p>No users found</p>
{:else}
    
{#each data.users as user}
<div class="post">
    <li>Username: {user.username}</li>
    <li>First Name: {user.first_name}</li>
    <li>Last Name: <p>{user.last_name}</p></li>
    <li>Email: {user.email}</li>
    <li>Providor: {user.providor}</li>
    <li>Roles: {user.labels}</li>
    <li>Created On: {new Date(parseInt(user.created_on))}</li>
</div>
{/each}

{/if}


<style>
    .post {
        border: 1px solid #ccc;
        padding: 16px;
        margin: 16px 0;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .post li {
        list-style-type: none;
        margin: 8px 0;
    }

    .post p {
        margin: 0;
    }
</style>