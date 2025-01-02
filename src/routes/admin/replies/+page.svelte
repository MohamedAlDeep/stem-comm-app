<script>
    export let data;
    // console.log(data.posts);
</script>

<h1>Replies</h1>

<h1>Links</h1>
<a href="/">Home</a>
<a href="/admin">Admin Panel</a>
{#if data.replies.length == 0}
<p>No replies found</p>
{:else}
    {#each data.replies as reply}
        <div class="post">
            <li>Owner: {reply.creator}</li>
            <li>Title: {reply.title}</li>
            <li>Content: <p>{reply.content}</p></li>
            <li>Date: {new Date(parseInt(reply.date))}</li>
            <li>Original Post ID: {reply.reply_id}</li>
            <a href={`/admin/replies/reply?id=${reply.id}`}>Link</a>
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