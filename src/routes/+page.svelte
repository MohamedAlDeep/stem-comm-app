<h1>Welcome to STEM Community platform</h1>
<div>
    <h3>Links</h3>
    <a href="/admin/">Admin Panel</a>
    <a href="/announcements/general">General Announcements</a>
    <a href="/announcements/teams/">Teams Announcements</a>
    
    <a href="/discussions/general">General Discussions</a>
    <a href="/discussions/teams">Teams Discussions</a>
</div>

<h3>API Routes</h3>
<ul>
    <li>
        <strong>GET /api/posts/all</strong>
        <p>Retrieve all posts from the database.</p>
    </li>
    <li>
        <strong>POST /api/posts/insert</strong>
        <p>Insert a post</p>
    </li>
    <li>
        <strong>GET /api/replies/all</strong>
        <p>Retrieve all replies</p>
    </li>
    <li>
        <strong>POST /api/replies/insert</strong>
        <p>Insert a reply based on a post id in the payload</p>
    </li>
    <li>
        <strong>GET /api/users/all</strong>
        <p>Retrieve all users data</p>
    </li>
    <li>
        <strong>POST /api/replies/insert</strong>
        <p>Add a user from a providor api</p>
    </li>
</ul>
<h3>API Requirements</h3>
<p>To have <strong>api-key</strong> and the request must contain a payload for <strong>POST</strong> requests</p>

<style>
    a{
        display: block;
        margin: 10px;
    }
    strong {
        font-family: monospace;
        background-color: #f5f5f5;
        padding: 2px 4px;
        border-radius: 4px;
    }
</style>