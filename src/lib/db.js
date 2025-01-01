import pg from 'pg'
const { Client } = pg

const newClient = new Client({
  user: '', // replace with your PostgreSQL username
  host: '/var/run/postgresql', // replace with your PostgreSQL host
  port: 5432, // replace with your PostgreSQL port if different
//   database: 'stem_app'
})

// Show tables in database
async function show_tables(){
    const res = await newClient.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name;
    `)
    console.log(res.rows)
}
show_tables()
async function create_table(name){
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
    console.log("Table created successfully")
}




// Get all rows
async function getRows(table) {
    const res = await newClient.query(`
    SELECT * FROM ${table};
    `)
    console.log(res.rows)
}

// Get a specific row
async function getRow(table, id) {
    const res = await newClient.query(`
    SELECT * FROM ${table}
    WHERE id = ${id};
    `)
    console.log(res.rows)
}

await newClient.connect()
