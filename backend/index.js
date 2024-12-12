const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "lvalenta",
  password: 11,
  database: "lvalenta",
});

app.use(express.urlencoded({ extended: true }));

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port, () => {
  console.log("Server running at port: " + port);
});

app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjige", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/knjige/autor/:autor", (req, res) => {
  const autor = req.params.autor;
  const query = "SELECT * FROM knjige WHERE autor LIKE ?";
  const queryParams = [`%${autor}%`];
  connection.query(query, queryParams, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/knjige/naslov/:naslov", (req, res) => {
  const naslov = req.params.naslov;
  const query = "SELECT * FROM knjige WHERE naslov LIKE ?";
  const queryParams = [`%${naslov}%`];
  connection.query(query, queryParams, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/knjige/slob_knjige", (req, res) => {
  const query =
    "SELECT (knjiga.stanje - count(rezervacija.knjiga)) as slobodne, knjiga.id, knjiga.naslov, knjiga.stanje FROM `knjiga` left join rezervacija on knjiga.id=rezervacija.knjiga group by knjiga.id";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/knjige/slob_knjige/:id_knjige", (req, res) => {
  const id_knjige = req.params.id_knjige;
  const query = "SELECT * FROM knjige WHERE id_knjige LIKE ?";
  const queryParams = [`%${id_knjige}%`];
  connection.query(query, queryParams, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/rezerv_knjige", (req, res) => {
  const query =
    "SELECT * FROM knjiga, rezervacija WHERE knjiga.id=rezervacija.knjiga";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/rezerv_knjige_korisnici", (req, res) => {
  const query =
    "SELECT * FROM knjiga, rezervacija, korisnik WHERE knjiga.id=rezervacija.knjiga and korisnik.id=rezervacija.korisnik";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/rezerv_knjige/korisnik/:id_korisnik", (req, res) => {
  const id_korisnik = req.params.id_korisnik;
  const query =
    "SELECT * FROM knjiga, rezervacija, korisnik WHERE knjiga.id=rezervacija.knjiga and korisnik.id=rezervacija.korisnik AND korisnik.id=id_korisnik";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/rezerv_knjige/knjiga/:id_knjige", (req, res) => {
  const id_knjige = req.params.id_knjige;
  const query =
    "SELECT * FROM knjiga, rezervacija, korisnik WHERE knjiga.id=rezervacija.knjiga and korisnik.id=rezervacija.korisnik AND knjiga.id=id_knjiga";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/korisnici", (req, res) => {
  const query = "SELECT * FROM korisnik";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/korisnici/:id_korisnik", (req, res) => {
  const id_knjige = req.params.id_knjige;
  const query = "SELECT * FROM korisnik WHERE id_korisnik LIKE ?";
  const queryParams = [`%${id_korisnik}%`];
  connection.query(query, queryParams, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.put("/api/korisnici/:id_korisnik", (req, res) => {
  const idKorisnik = req.params.id_korisnik;
  const { ime, prezime, email } = req.body;

  if (!ime || !prezime || !email) {
    return res
      .status(400)
      .json({ error: "Molimo unesite sve podatke (ime, prezime, email)." });
  }

  const query = `UPDATE korisnik SET ime = ?, prezime = ?, email = ? WHERE id = ?`;
  const queryParams = [ime, prezime, email, idKorisnik];

  connection.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Greška pri izvršavanju upita:", error.message);
      return res.status(500).json({ error: "Greška na serveru." });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    res.json({ message: "Podaci o korisniku uspešno ažurirani." });
  });
});

app.post("/api/rezerv_knjige/:id_knjige", (req, res) => {
  const idKnjige = req.params.id_knjige;
  const { id_korisnik, datum_rezervacije } = req.body;

  if (!id_korisnik || !datum_rezervacije) {
    return res.status(400).json({
      error: "Molimo unesite sve podatke (id_korisnik, datum_rezervacije).",
    });
  }

  const query = `INSERT INTO rezervacija (datum_rezervacije, knjiga, korisnik) VALUES (?, ?, ?)`;
  const queryParams = [datum_rezervacije, idKnjige, id_korisnik];

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Greška pri izvršavanju upita:", err.message);
      return res.status(500).json({ error: "Greška na serveru." });
    }
    res.status(201).json({
      message: "Rezervacija uspešno dodata.",
      rezervacija_id: results.insertId,
    });
  });
});

app.delete("/api/rezerv_knjige/:id_knjiga", (req, res) => {
  const idKnjiga = req.params.id_knjiga;

  const query = `DELETE FROM rezervacija WHERE knjiga = ?`;
  const queryParams = [idKnjiga];

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Greška pri izvršavanju upita:", err.message);
      return res.status(500).json({ error: "Greška na serveru." });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Rezervacija za ovu knjigu nije pronađena." });
    }

    res.json({ message: "Rezervacija uspešno obrisana." });
  });
});
