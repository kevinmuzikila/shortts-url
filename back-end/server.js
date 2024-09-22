const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');
const connectDB = require('./config/db');

// //
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kevinmuzikila:01ZQJ7WR3EXtUNx8@blogging.dnaovr9.mongodb.net/url_short', {
    useNewUrlParser: true,
        useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();
  const newUrl = new Url({ originalUrl, shortUrl });

  await newUrl.save();
  res.json({ originalUrl, shortUrl });
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
