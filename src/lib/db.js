import pg from 'pg'
const { Client } = pg

// Import functions from files
// import { User_Posts_from_id, insertRow_to_posts, updateRow_to_posts, deleteRow_to_posts } from './posts.js'
// import { User_from_id, insertRow_to_users, updateRow_to_users, deleteRow_to_users } from './users.js'

const newClient = new Client({
  user: '', // replace with your PostgreSQL username
  host: '/var/run/postgresql', // replace with your PostgreSQL host
  port: 5432, // replace with your PostgreSQL port if different
//   database: 'stem_app'
})




// Show tables in database
export async function show_tables(){
    const res = await newClient.query(`
        select * from information_schema.table
    `)
    return {...res.rows}
}

export async function create_table(name){
    await newClient.query(`
        CREATE TABLE IF NOT EXISTS ${name} (
          id SERIAL PRIMARY KEY,
          creator VARCHAR(255),
          title VARCHAR(255),
          content TEXT,
          date TIMESTAMP,
          replies_number INTEGER,
          replies_links TEXT[]
        );
      `)      
    return {response: "Table created successfully"}
}




// Get all rows
export async function getRows(table) {
    const res = await newClient.query(`
    SELECT * FROM ${table};
    `)
    return [...res.rows]
}

// Get a specific row
export async function Post_from_id(id) {
  const query = `
      SELECT *
      FROM posts
      WHERE posts.id = $1;
  `;
  const values = [id];
  const res = await newClient.query(query, values);
  return res.rows[0];
}


export async function User_Posts_from_id(id){
  const res = await newClient.query(`
      SELECT *
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE users.id = ${id};    
  `)
  return {...res.rows}
} 
export async function insertRow_to_posts(creator, title, content, date, replies_number, replies_links) {
  const query = `
  INSERT INTO posts (creator, title, content, date, replies_number, replies_links)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;
  const values = [creator, title, content, date, replies_number, replies_links];
  const res = await newClient.query(query, values);
  return {response: res, data: values}
}
// post.id, post.title, post.content, post.replies_number + 1, { id: res.id, creator: res.creator }
export async function updateRow_to_posts(id, title, content, replies_number, newReply) {
  const query = `
      UPDATE posts
      SET title = $1,
        content = $2,
        replies_number = $3,
        replies_links = array_append(replies_links, $4::jsonb)
      WHERE id = $5
      RETURNING *;
  `;
  const newReplyObject = JSON.stringify({ id: newReply.id, creator: newReply.creator });
  const values = [title, content, replies_number, newReplyObject, id];
  // console.log(values)
  const res = await newClient.query(query, values);

  return { response: "Row updated successfully", data: res.rows };
}

export async function updateRow_to_posts_FROM_POSTS(creator, title, content, replies_number, replies_links, id) {
  const query = `
      UPDATE posts
      SET title = $1,
          creator = $2,
          content = $3,
          replies_number = $4,
          replies_links = $5
      WHERE id = $6
      RETURNING *;
  `;
  const values = [title, creator, content, replies_number, replies_links, id];
  const res = await newClient.query(query, values);
  return { response: "Row updated successfully", data: res.rows };
}

// Delete a row
export async function deleteRow_to_posts(id) {
  await newClient.query(`
  DELETE FROM posts
  WHERE id = ${id};
  `)
  return {response: "Row deleted successfully"}
}

export async function insertDeleted_POST(id, creator, title, content, date, replies_number, replies_links, date_deleted) {
  await newClient.query(`
    INSERT INTO deletedposts (id_before_deletion, creator, title, content, date, replies_number, replies_links, date_deleted)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `, [id, creator, title, content, date, replies_number, replies_links, date_deleted]);

  return {response: "Row deleted successfully"}
}


export async function User_from_id(id){
  const res = await newClient.query(`
      SELECT posts.id, posts.content
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE users.id = ${id};    
  `)
  console.log(res.rows)
} 
export async function insertRow_to_users(username, first_name, last_name, email, providor, created_on, labels) {
  const query = `
  INSERT INTO users (username, first_name, last_name, email, providor, created_on, labels)
  VALUES ($1, $2, $3, $4, $5, $6, %7)
  RETURNING *;
  `;
  const values = [username, first_name, last_name, email, providor, created_on, labels];
  const res = await newClient.query(query, values);
  return {response: res, data: values}
}

export async function updateRow_to_users(id, username, first_name, last_name, email, providor, created_on, labels) {  
  const query = `
  UPDATE posts
  SET username = $1,
  SET first_name =  $2,
  SET last_name = $3,
  SET email =  $4,
  SET providor =  $5,
  SET labels = $6,
  WHERE id = $7;
  `
  const values = [username, first_name, last_name, email, providor, created_on, labels, id]
  const res = await newClient.query(query, values);
  return { response: "Row updated successfully", data: res.rows };
}



export async function updateRow_to_users(id, title, content, replies_number, labels, newReply) {  
  const query = `
  UPDATE posts
  SET title = $1,
      content = $2,
      replies_number = $3,
      replies_links = array_append(replies_links, $4::jsonb),
  WHERE id = $5
  RETURNING *;
  `;
  const newReplyObject = JSON.stringify({ id: newReply.id, creator: newReply.creator });
  const values = [title, content, replies_number, newReplyObject, id];
  const res = await newClient.query(query, values);
  
  return { response: "Row updated successfully", data: res.rows };
}

// ...existing code...

// Delete a row
export async function deleteRow_to_users(id) {
  await newClient.query(`
  DELETE FROM posts,
  WHERE id = ${id};
  `)
  console.log('Row deleted successfully')
}

export async function insertRow_to_reply(creator, title, content, date, reply_id) {
  const query = `
  INSERT INTO replies (creator, title, content, date, reply_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;
  const values = [creator, title, content, date, reply_id];
  const res = await newClient.query(query, values);


  return res.rows[0]
}
export async function Reply_from_id(id) {
  const query = `
      SELECT *
      FROM replies
      WHERE replies.id = $1;
  `;
  const values = [id];
  const res = await newClient.query(query, values);
  return { data: res.rows };
}

await newClient.connect()


