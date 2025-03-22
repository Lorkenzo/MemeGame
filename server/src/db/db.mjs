import sqlite  from "sqlite3";

export const db = new sqlite.Database('./src/db/db.db',(err)=>{
    if (err) throw err;
});
