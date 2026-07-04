import { getDb, getArticleById } from './src/lib/db.ts';

async function test() {
  let db = await getDb();
  console.log('1. Got db');
  db.run("INSERT INTO articles (title, excerpt, content, date, category, image, author) VALUES ('a', 'b', 'c', 'd', 'e', 'f', 'g')");
  console.log('2. Inserted row');
  
  // Try to get last insert rowid BEFORE saveDb
  let results = db.exec('SELECT last_insert_rowid() as id');
  let lastId = results[0].values[0][0] as number;
  console.log('3. lastId before saveDb:', lastId);
  
  // Call saveDb
  const fs = require('fs');
  const path = require('path');
  const DB_PATH = path.join(process.cwd(), 'data', 'tpq.db');
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
  console.log('4. Saved DB manually');
  
  // Get last insert rowid AFTER saveDb
  results = db.exec('SELECT last_insert_rowid() as id');
  let lastIdAfter = results[0].values[0][0] as number;
  console.log('5. lastId after saveDb:', lastIdAfter);
  
  // Now call getArticleById (which will trigger reload!)
  console.log('6. Calling getArticleById...');
  const article = await getArticleById(lastId);
  console.log('7. article:', article);
}

test();
