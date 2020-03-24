const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const connection = require('./conf');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/api/movies', (req, res) => {
    connection.query("SELECT * from movie", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/api/movies/names', (req, res) => {
    connection.query("SELECT * name from movie", (err, results) => {
        if (err) {
            res.status(500).send("Error charging /api/movies/names");
        } else {
            res.json(results);
        }
    });
});

app.post('/api/movies', (req,res) => {
  const formData = req.body;
  connection.query('INSERT INTO movie SET ?', formData, (err, results) => {
    if (err) {
        res.status(500).send("Error adding movie");
      } else {
        res.sendStatus(200)
      }
    }
  )
})

app.put('/api/movies/:id', (req, res) => {
  const idMovie = req.params.id;
  const formData = req.body;

   connection.query('UPDATE movie SET ? WHERE id = ?', [formData, idMovie], err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/movies/:id', (req, res) => {

  const idMovies = req.params.id;

  connection.query('DELETE FROM movie WHERE id = ?', [idMovies], err => {
    if (err) {
       console.log(err);
      res.status(500).send("Error deleting an employee");
    } else {
      res.sendStatus(200);
    }
  });
});


app.listen(port, (err) => {
  if (err) {
    throw new Error('not working');
  }
  console.log("server is listening")

})
