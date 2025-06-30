require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URL;
const dbName = uri.split('/').pop().split('?')[0];

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('Veritabanındaki koleksiyonlar:');
    collections.forEach(col => console.log('- ' + col.name));
    if (collections.length === 0) {
      console.log('(Hiç koleksiyon yok, ilk veri eklenince otomatik oluşur!)');
    }
  } catch (e) {
    console.error('Hata:', e);
  } finally {
    await client.close();
  }
}
run(); 