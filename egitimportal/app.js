const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');
const app = express();

// MSSQL veritabanı bağlantı konfigürasyonu
const config = {
  user: 'yasin',
  password: '123456',
  server: 'DESKTOP-29OOQRI',
  database: 'Sirket',
  options: {
    encrypt: true, // Bu satırı zaten kullanıyorsanız güncelleyin veya ekleyin
    trustServerCertificate: true, // Self-signed sertifikaları kabul etmek için bu seçeneği ekleyin
    
}
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));




// Ana sayfa
app.get('/',  (req, res) => {
  res.sendFile(__dirname + '\index.html');
  //res.json({msg: 'This is CORS-enabled for a Single Route'})
});

app.use(cors());



// Sunucu tarafı
app.get('/getTutors', async (req, res) => {
  
  await sql.connect(config);
  try {
    const query = 'SELECT * FROM tutors'; // Sorguyu burada tanımlayın
    const result = await sql.query(query);
   
    const tutorData = result.recordset; // Tutor bilgilerini bir değişkende sakla
    res.json(tutorData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veri çekilemedi.' });
  }
});



app.post('/check', async (req, res) => {
  const { name,userName2,eposta,sifre2 } = req.body;
  console.log(req.body);
  
  try{
  await sql.connect(config);

  const result = await sql.query`SELECT * FROM users WHERE username = ${userName2} AND password = ${sifre2}`;
  
  if (result.recordset.length > 0) {
    console.log('Kullanıcı bulundu:');
    const userId = result.recordset[0].id;
    console.log(result.recordset[0]);
    //res.json({ message: 'Kullanıcı bulundu.' });
    res.status(200).json({ userId });

  } else {
    console.log('Kullanıcı bulunamadı.');
    //res.json({ message: 'Kullanıcı bulunamadı.' });
    res.status(400).json({ message: 'Kullanıcı bulunmadıııı.' });

  }
          
  } catch (err) {
      console.error('Hata:', err);
      res.send('Hata oluştuaaa.');
  }
  
}); 

app.post('/kaydet', async (req, res) => {
  

  const { name,userName,eposta,sifre } = req.body;
  console.log(req.body);
  
  try {
    
    const pool = await sql.connect(config);
    
    const result = await pool.request()
      .input('name', sql.NVarChar, name) 
      .input('userName', sql.NVarChar, userName)
      .input('eposta', sql.NVarChar, eposta)
      .input('sifre', sql.NVarChar, sifre)
      .query('INSERT INTO users (name,username,email, password) VALUES (@name,@userName,@eposta, @sifre)');
      console.error("JSON içeriği:", JSON.stringify({ message: 'Veri başarıyla kaydedildi.' }));
      res.json({ message: 'Veri başarıyla kaydedildi.' })
      //json({ message: 'Veri başarıyla kaydedildi.' });
  } catch (err) {
    
    console.error('Hata:', err);
    res.send('Hata oluştuaaa.');
  }
});

app.post('/update-profile', async (req, res) => {
  const { id,name, username, email, password } = req.body;
  
  try {
      await sql.connect(config);
      const query = `
          UPDATE users
          SET name = '${name}',username='${username}', email = '${email}', password = '${password}'
          WHERE id = '${id}'
      `;

      const result = await sql.query(query);
      res.send('Profil güncellendi.');
  } catch (error) {
      console.error(error);
      res.status(500).send('Bir hata oluştu.');
  }
});


app.get('/getProfileData/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const pool = await sql.connect(config);

          const query = `
        SELECT *
        FROM profil
        INNER JOIN users ON profil.userId = users.id
        WHERE profil.userId = ${userId}
    `;

    const result = await pool.request().query(query);

    if (result.recordset.length === 0) {
      res.status(404).send('User not found');
        } else {
      res.json(result.recordset[0]);
        }
      
      
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});







app.post('/save', async (req, res) => {
  const selectedLanguages = req.body.selectedLanguages;
  const selectedTechnologies = req.body.selectedTechnologies;
  const userId=req.body.userId;
  const universite = req.body.universite;
  const bolum = req.body.bolum;
  const dil = req.body.dil;
  const github = req.body.github;
  const linkedin = req.body.linkedin;

  try {
      await sql.connect(config);
      const query = `
          INSERT INTO profil (selectedLanguages, selectedTechnologies,userId, universite,bolum,dil, github, linkedin)
          VALUES ('${selectedLanguages}', '${selectedTechnologies}', ${userId}, '${universite}', '${bolum}', '${dil}', '${github}', '${linkedin}')
      `;
      await sql.query(query);

      res.status(200).send('Veriler başarıyla kaydedildi');
  } catch (err) {
      console.error(err);
      res.status(500).send('Bir hata oluştu');
  } finally {
      sql.close();
  }
});

// Sunucuyu başlat
app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor...');
});
