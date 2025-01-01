<script>
    export let data;
    // console.log(data.posts);
</script>

<h1>Replies</h1>

<h1>Links</h1>
<a href="/">Home</a>
<a href="/admin">Admin Panel</a>

    {#each data.replies as reply}
        <div class="post">
            <li>Owner: {reply.creator}</li>
            <li>Title: {reply.title}</li>
            <li>Content: <p>{reply.content}</p></li>
            <li>Date: {new Date(parseInt(reply.date))}</li>
            <li>Reply ID: {reply.reply_id}</li>
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