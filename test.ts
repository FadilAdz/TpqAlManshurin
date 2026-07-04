import { getDb, getArticleById } from './src/lib/db.ts';

async function test() {
  const db = await getDb();
  db.run("INSERT INTO articles (title, excerpt, content, date, category, image, author) VALUES ('a', 'b', 'c', 'd', 'e', 'f', 'g')");
  
  const results = db.exec('SELECT last_insert_rowid() as id');
  const lastId = results[0].values[0][0] as number;
  console.log('lastId:', lastId);
  
  const resWithParams = db.exec('SELECT * FROM articles WHERE id = ?', [lastId]);
  console.log('resWithParams length:', resWithParams.length);
  
  const resWithoutParams = db.exec(`SELECT * FROM articles WHERE id = ${lastId}`);
  console.log('resWithoutParams length:', resWithoutParams.length);
  
  const article = await getArticleById(lastId);
  console.log('article:', article);
}

test();
