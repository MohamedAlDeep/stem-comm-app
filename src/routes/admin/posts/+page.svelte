<script>
    export let data;
    console.log(data.posts.replies_links);
</script>

<h1>Posts</h1>

<h1>Links</h1>
<a href="/">Home</a>
<a href="/admin">Admin Panel</a>
{#if data.posts.length == 0}
<p>No posts found</p>
{:else}
    {#each data.posts as post}
    <!-- <p>{JSON.stringify(post.replies_links}</p> -->
        <div class="post">
            <li>Post ID: {post.id}</li>
            <li>Owner: {post.creator}</li>
            <li>Title: {post.title}</li>
            <li>Content: <p>{post.content}</p></li>
            <li>Date: {new Date(parseInt(post.date))}</li>
            
            <li>Replies Count: {post.replies_number}</li>
            <!-- {#if post.replies_links.length == 0}
            <p>No replies </p>
            {:else} -->
            
            <a href={`/admin/posts/${post.id}`}>More info</a>
            <!-- {/if} -->
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