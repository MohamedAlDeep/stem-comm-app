export async function User_from_id(id){
    const res = await newClient.query(`
        SELECT posts.id, posts.content
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE users.id = ${id};    
    `)
    console.log(res.rows)
} 
export async function insertRow_to_users(creator, title, content, date, replies_number, replies_links) {
    await newClient.query(`
    INSERT INTO posts (creator, title, content, date, replies_number, replies_links)
    VALUES (${creator}, ${title}, ${content}, ${date}, ${replies_number}, ${replies_links});
    `)
    console.log('Row inserted successfully')
}

export async function updateRow_to_users(id, title, content, replies_number, replies_links) {  
    await newClient.query(`
    UPDATE posts
    SET title = ${title}
    SET content =  ${content}
    SET replies_number =  ${replies_number}
    replies_links =  ${replies_links}
    WHERE id = ${id};
    `)
    console.log('Row updated successfully')
}

// Delete a row
export async function deleteRow_to_users(id) {
    await newClient.query(`
    DELETE FROM posts,
    WHERE id = ${id};
    `)
    console.log('Row deleted successfully')
}