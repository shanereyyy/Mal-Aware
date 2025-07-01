const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Firebase Admin init
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const lessonsPath = './lessons';

async function uploadAllLessons() {
  const files = fs.readdirSync(lessonsPath);
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(lessonsPath, file);
      const lesson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const docId = file.replace('.json', '');

      try {
        await db.collection('lessons').doc(docId).set(lesson);
        console.log(`✅ Uploaded: ${docId}`);
      } catch (err) {
        console.error(`❌ Failed: ${docId}`, err);
      }
    }
  }
}

uploadAllLessons();
