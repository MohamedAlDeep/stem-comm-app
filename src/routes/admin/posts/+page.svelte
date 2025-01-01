<script>
    export let data;
    // console.log(data.posts);
</script>

<h1>Posts</h1>

    {#each data.posts as post}
        <div class="post">
            <li>Owner: {post.creator}</li>
            <li>Title: {post.title}</li>
            <li>Content: <p>{post.content}</p></li>
            <li>Date: {new Date(post.date).toLocaleString()}</li>
            <li>Replies: {post.replies_number}</li>
        </div>
    {/each}


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