require('./message');
const { tiktok, capcut, igdl, fbdl, aiodl, islamai,tiktoksearch, pindl, listmember, luminai, pinterest, brat, tiktokdll, jadwalSholat, JadwalTvBola,SimSimi,igdown } = require('./danz');
const express = require('express');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const memoryStore = require('memorystore')(session);
const cors = require('cors');
const secure = require('ssl-express-www');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(pickRandom(['AIzaSyAeBoAfQnP0UDrKaiVkUJyZI-F1LC_AMcM', 'AIzaSyAeBoAfQnP0UDrKaiVkUJyZI-F1LC_AMcM']));
var model = genAI.getGenerativeModel({ model: "gemini-pro" });

const author = "FarisFreya";
const PORT = process.env.PORT || 3000;
const app = express();

// Function
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('trust proxy', 1);
app.use(compression());

const limit = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 2000, 
  message: 'Oops too many requests'
});
app.use(limit);

app.use(cors())
app.use(secure)

app.use(session({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new memoryStore({
    checkPeriod: 86400000
  }),
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.render('api', { title: 'Endpoint - Faris API'})
});

app.get('/tiktokdl', (req, res) => {
  res.render('tiktokdl')
});

app.get('/views/luminai', (req, res) => {
  res.render('luminai')
});

  
app.get('/douyindl', (req, res) => {
  res.render('douyindl')
});

app.get('/remini', (req, res) => {
  res.render('remini')
});

app.get('/speech', (req, res) => {
  res.render('speech')
})

app.get('/docs', (req, res) => {
  res.render('docs')
});

// Downloader
app.get('/tiktok', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await tiktok(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      limitnya: limit,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 app.get('/Ytdl', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await Ytdl(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      limitnya: limit,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});            

 app.get('/SimSimi', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) {
        return res.status(400).json({ error: 'Parameter "text" Tidak Ditemukan, Tolong Masukkan Perintah' });
      }
      const response = await SimSimi(text);
      res.status(200).json({
        status: true,
      creator: author,
      message: response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 

app.get('/luminai', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) {
        return res.status(400).json({ error: 'Parameter "text" Tidak Ditemukan, Tolong Masukkan Perintah' });
      }
      const response = await luminai(text);
      res.status(200).json({
        status: true,
      creator: author,
      message: response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/islamai', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) {
        return res.status(400).json({ error: 'Parameter "text" Tidak Ditemukan, Tolong Masukkan Perintah' });
      }
      const response = await islamai(text);
      res.status(200).json({
        status: true,
      creator: author,
      message: response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});               

app.get('/githubStalk', async (req, res) => {
    try {
      const { username } = req.query;
      if (!username) {
        return res.status(400).json({ error: 'Parameter "text" Tidak Ditemukan, Tolong Masukkan Perintah' });
      }
      const response = await githubStalk(username);
      res.status(200).json({
        status: true,
      creator: author,
      message: response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});               

app.get('/brat', async (req, res) => {
  try {
      const { text } = req.query;
      if (!text) {
        return res.status(400).json({ error: 'Parameter "text" Tidak Ditemukan, Tolong Masukkan Perintah' });
      }
      const response = await brat(text);
      res.status(200).json({
        status: true,
      creator: author,
      message: response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/pindl', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await pindl(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tiktokDl', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await tiktokDl(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tiktokdll', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await tiktokdll(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get('/instagram', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await igdl(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/capcut', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await capcut(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/igdown', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await igdown(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/facebook', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await fbdl(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  


app.get('/blackboxai', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json(msg.paramquery);

  try {
    const data = await model.generateContent(query);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data.response.text()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/aio', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await aiodl(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getSearchResults', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await getSearchResults(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});                       

// Search
app.get('/listmember', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json(msg.paramquery);

  try {
    const data = await listmember(query);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tiktoksearch', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json(msg.paramquery);

  try {
    const data = await tiktoksearch(query);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/jadwalSholat', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json(msg.paramquery);

  try {
    const data = await jadwalSholat(query);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/JadwalTvBola', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json(msg.paramquery);

  try {
    const data = await JadwalTvBola(query);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});  


app.get('/pinterest', async (req, res) => {  
  const query = req.query.query;
  if (!query) return res.json(msg.paramquery);

  try {
    const data = await pinterest(query);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
        
// AI
app.get('/gemini', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json(msg.paramquery);

  try {
    const data = await model.generateContent(query);
    if (!data) {
      return res.json({ status: false, message: msg.nodata });
    }

    res.json({
      status: true,
      creator: author,
      result: data.response.text()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Stalker

app.listen(PORT, () => {
  console.log(`[STATUS] >> Server is running on port ${PORT}`);
});
