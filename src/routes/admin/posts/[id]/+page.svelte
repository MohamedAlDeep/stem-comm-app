<script>
    export let data;
    const post = data.data
</script>


<div>
    <h1>Post Details</h1>
    <a href="/admin/posts">Posts</a>
    <p><strong>ID:</strong> {post.id}</p>
    <p><strong>Creator:</strong> {post.creator}</p>
    <p><strong>Title:</strong> {post.title}</p>
    <p><strong>Content:</strong> {post.content}</p>
    <p><strong>Date:</strong> {post.date}</p>
    <p><strong>Replies Number:</strong> {post.replies_number}</p>
    {#if post.replies_links.length == 0}
        
    {:else}
    <p>Replies Links: </p>
    {#each post.replies_links as reply}
            <li style="margin: 0.5rem;"> By: {reply.creator}</li>
            <a href={`/admin/replies/reply?id=${reply.id}`}>
                Link
            </a>
    {/each}
    
    {/if}
    
</div>