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
async function getRow(table, id) {
    const res = await newClient.query(`
    SELECT * FROM ${table}
    WHERE id = ${id};
    `)
    return {...res.rows}
}


export async function User_Posts_from_id(id){
  const res = await newClient.query(`
      SELECT posts.id, posts.content
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

export async function updateRow_to_posts(id, title, content, replies_number, replies_links) {  
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
export async function deleteRow_to_posts(id) {
  await newClient.query(`
  DELETE FROM posts,
  WHERE id = ${id};
  `)
  console.log('Row deleted successfully')
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
export async function insertRow_to_users(username, first_name, last_name, email, providor, created_on) {
  const query = `
  INSERT INTO users (username, first_name, last_name, email, providor, created_on)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;
  const values = [username, first_name, last_name, email, providor, created_on];
  const res = await newClient.query(query, values);
  return {response: res, data: values}
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

export async function insertRow_to_reply(creator, title, content, date, reply_id) {
  const query = `
  INSERT INTO replies (creator, title, content, date, reply_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;
  const values = [creator, title, content, date, reply_id];
  const res = await newClient.query(query, values);
  return {response: res, data: values}
}

await newClient.connect()


