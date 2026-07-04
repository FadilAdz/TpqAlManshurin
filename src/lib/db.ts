import initSqlJs, { type Database } from 'sql.js';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'tpq.db');

let db: Database | null = null;
let lastReadTime: number = 0;

export interface ArticleRow {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryRow {
  id: number;
  title: string;
  image: string;
  order_index: number;
  created_at: string;
}

async function getDb(): Promise<Database> {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const stat = fs.existsSync(DB_PATH) ? fs.statSync(DB_PATH) : null;
  const mtime = stat ? stat.mtimeMs : 0;

  if (db && mtime <= lastReadTime) return db;

  const SQL = await initSqlJs();

  if (stat) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  lastReadTime = mtime || Date.now();

  // Create table if not exists
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'Nasehat',
      image TEXT NOT NULL DEFAULT '/images/10.jpg',
      author TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS daily_traffic (
      date TEXT PRIMARY KEY,
      views INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      image TEXT NOT NULL,
      order_index INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Seed gallery if empty
  const galleryCount = db.exec('SELECT COUNT(*) FROM gallery')[0].values[0][0] as number;
  if (galleryCount === 0) {
    const initialPhotos = [
      { src: '/images/1.jpg', alt: 'Penerimaan Raport & Makan Bareng' },
      { src: '/images/16.jpg', alt: 'Keakraban Jamaah' },
      { src: '/images/3.jpg', alt: 'Kompetisi Voli Antar Desa' },
      { src: '/images/4.jpg', alt: 'Acara Badminton Bersama' },
      { src: '/images/5.jpg', alt: 'Kebersamaan Pengurus' },
      { src: '/images/15.jpg', alt: 'Hari Raya Idul Fitri' },
      { src: '/images/13.jpg', alt: 'Kegiatan Seni Beladiri Asad Ibu ibu' },
      { src: '/images/8.jpg', alt: 'Kegiatan Keakraban Muda Mudi' },
      { src: '/images/12.jpg', alt: 'Kegiatan Persami (Perkemahan Sabtu & Minggu)' },
    ];

    initialPhotos.forEach((photo, index) => {
      db!.run(
        `INSERT INTO gallery (title, image, order_index) VALUES (?, ?, ?)`,
        [photo.alt, photo.src, index]
      );
    });
  }

  saveDb();
  return db;
}

function saveDb() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, buffer);

  if (fs.existsSync(DB_PATH)) {
    lastReadTime = fs.statSync(DB_PATH).mtimeMs;
  }
}

// --- CRUD Functions ---

export async function getAllArticles(): Promise<ArticleRow[]> {
  const database = await getDb();
  const results = database.exec('SELECT * FROM articles ORDER BY id DESC');
  if (results.length === 0) return [];

  const columns = results[0].columns;
  return results[0].values.map((row) => {
    const obj: Record<string, unknown> = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj as unknown as ArticleRow;
  });
}

export async function getArticleById(id: number): Promise<ArticleRow | undefined> {
  const database = await getDb();
  const results = database.exec('SELECT * FROM articles WHERE id = ?', [id]);
  if (results.length === 0 || results[0].values.length === 0) return undefined;

  const columns = results[0].columns;
  const row = results[0].values[0];
  const obj: Record<string, unknown> = {};
  columns.forEach((col, i) => {
    obj[col] = row[i];
  });
  return obj as unknown as ArticleRow;
}

export async function createArticle(data: {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category?: string;
  image?: string;
  author?: string;
}): Promise<ArticleRow> {
  const database = await getDb();
  database.run(
    `INSERT INTO articles (title, excerpt, content, date, category, image, author)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.excerpt,
      data.content,
      data.date,
      data.category || 'Nasehat',
      data.image || '/images/10.jpg',
      data.author || '',
    ]
  );

  saveDb();

  // Get the last inserted row
  const results = database.exec('SELECT MAX(id) as id FROM articles');
  const lastId = results[0].values[0][0] as number;
  return (await getArticleById(lastId))!;
}

export async function updateArticle(
  id: number,
  data: {
    title?: string;
    excerpt?: string;
    content?: string;
    date?: string;
    category?: string;
    image?: string;
    author?: string;
  }
): Promise<ArticleRow | undefined> {
  const database = await getDb();
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title); }
  if (data.excerpt !== undefined) { fields.push('excerpt = ?'); values.push(data.excerpt); }
  if (data.content !== undefined) { fields.push('content = ?'); values.push(data.content); }
  if (data.date !== undefined) { fields.push('date = ?'); values.push(data.date); }
  if (data.category !== undefined) { fields.push('category = ?'); values.push(data.category); }
  if (data.image !== undefined) { fields.push('image = ?'); values.push(data.image); }
  if (data.author !== undefined) { fields.push('author = ?'); values.push(data.author); }

  if (fields.length === 0) return getArticleById(id);

  fields.push("updated_at = datetime('now')");
  values.push(id);

  database.run(`UPDATE articles SET ${fields.join(', ')} WHERE id = ?`, values);
  saveDb();
  return getArticleById(id);
}

export async function deleteArticle(id: number): Promise<boolean> {
  const database = await getDb();
  database.run('DELETE FROM articles WHERE id = ?', [id]);
  saveDb();
  return true;
}

export async function getArticleCount(): Promise<number> {
  const database = await getDb();
  const results = database.exec('SELECT COUNT(*) as count FROM articles');
  if (results.length === 0) return 0;
  return results[0].values[0][0] as number;
}

export async function seedArticles(articles: Omit<ArticleRow, 'id' | 'created_at' | 'updated_at'>[]): Promise<void> {
  const count = await getArticleCount();
  if (count > 0) return; // Already seeded

  const database = await getDb();
  const stmt = database.prepare(
    `INSERT INTO articles (title, excerpt, content, date, category, image, author)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  for (const article of articles) {
    stmt.run([
      article.title,
      article.excerpt,
      article.content,
      article.date,
      article.category,
      article.image,
      article.author,
    ]);
  }
  stmt.free();
  saveDb();
}

export async function recordPageHit(): Promise<void> {
  const database = await getDb();
  const today = new Date().toISOString().split('T')[0];

  database.run(
    `INSERT INTO daily_traffic (date, views) VALUES (?, 1)
     ON CONFLICT(date) DO UPDATE SET views = views + 1`,
    [today]
  );
  saveDb();
}

export async function getDailyTraffic(): Promise<{ date: string, views: number }[]> {
  const database = await getDb();
  const results = database.exec('SELECT * FROM daily_traffic ORDER BY date ASC LIMIT 30');
  if (results.length === 0) return [];

  const columns = results[0].columns;
  return results[0].values.map((row) => {
    const obj: any = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
}

// --- Gallery Functions ---

export async function getAllGallery(): Promise<GalleryRow[]> {
  const database = await getDb();
  const results = database.exec('SELECT * FROM gallery ORDER BY order_index ASC, id DESC');
  if (results.length === 0) return [];

  const columns = results[0].columns;
  return results[0].values.map((row) => {
    const obj: Record<string, unknown> = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj as unknown as GalleryRow;
  });
}

export async function getGalleryById(id: number): Promise<GalleryRow | null> {
  const database = await getDb();
  const results = database.exec('SELECT * FROM gallery WHERE id = ?', [id]);

  if (results.length === 0) return null;

  const columns = results[0].columns;
  const row = results[0].values[0];

  const obj: Record<string, unknown> = {};
  columns.forEach((col, i) => {
    obj[col] = row[i];
  });

  return obj as unknown as GalleryRow;
}

export async function addGalleryItem(data: { title: string; image: string }): Promise<{ id: number }> {
  const database = await getDb();

  // Get max order_index
  const maxResults = database.exec('SELECT MAX(order_index) as max_order FROM gallery');
  let nextOrder = 0;
  if (maxResults.length > 0 && maxResults[0].values[0][0] !== null) {
    nextOrder = (maxResults[0].values[0][0] as number) + 1;
  }

  database.run(
    `INSERT INTO gallery (title, image, order_index) VALUES (?, ?, ?)`,
    [data.title, data.image, nextOrder]
  );
  const results = database.exec('SELECT last_insert_rowid()');
  const newId = results[0].values[0][0] as number;
  saveDb();
  return { id: newId };
}

export async function deleteGalleryItem(id: number): Promise<void> {
  const database = await getDb();
  database.run('DELETE FROM gallery WHERE id = ?', [id]);
  saveDb();
}

export async function updateGalleryOrder(items: { id: number; order_index: number }[]): Promise<void> {
  const database = await getDb();
  for (const item of items) {
    database.run('UPDATE gallery SET order_index = ? WHERE id = ?', [item.order_index, item.id]);
  }
  saveDb();
}

export { getDb };
