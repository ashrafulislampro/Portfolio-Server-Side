const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express()
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q0pfb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const reviewCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_CONNECT}`);
  
  app.post('/addReview', (req, res) => {
            const review = req.body;
            console.log(review)
            reviewCollection.insertOne(review)
            .then(result=>{
                      console.log(result);
                      res.send(result.acknowledged === true);
            });
  });

  app.get('/reviews', (req, res) => {
    reviewCollection.find({})
    .toArray((err, documents)=>{
      res.send(documents);
    })
  })
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)