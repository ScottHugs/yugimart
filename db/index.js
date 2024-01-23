const pg = require('pg')

const connectionString = process.env.DATABASE_URL 

console.log(connectionString)
const db = new pg.Pool({
    connectionString: connectionString
})

module.exports = db