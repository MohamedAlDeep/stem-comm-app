<script>
    export let data
</script>


<main>
    <h1>Reply</h1>

<a href="/admin/replies">All Replies</a>
<p>{JSON.stringify(data.reply)}</p>
    <p>ID: {data.reply[0].id}</p>
    <p>Creator: {data.reply[0].creator}</p>
    <p>Title: {data.reply[0].title}</p>
    <p>Content: {data.reply[0].content}</p>
    <p>Date: {new Date(parseInt(data.reply[0].date))}</p>
    <p>Original Post ID: {data.reply[0].reply_id}</p>

</main>
