const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "lvalenta",
  password: "11",
  database: "lvalenta"
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL database!");
});

app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.get("/api/knjige/autor/:autor", (req, res) => {
  const autor = req.params.autor;
  const query = "SELECT * FROM knjiga WHERE autor LIKE ?";
  connection.query(query, [`%${autor}%`], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.get("/api/knjige/naslov/:naslov", (req, res) => {
  const naslov = req.params.naslov;
  const query = "SELECT * FROM knjiga WHERE naslov LIKE ?";
  connection.query(query, [`%${naslov}%`], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.get("/api/knjige/slob_knjige", (req, res) => {
  const query = `
    SELECT (knjiga.stanje - COUNT(rezervacija.knjiga)) AS slobodne, 
           knjiga.id, knjiga.naslov, knjiga.stanje 
    FROM knjiga 
    LEFT JOIN rezervacija ON knjiga.id = rezervacija.knjiga 
    GROUP BY knjiga.id
  `;
  connection.query(query, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.get("/api/knjige/slob_knjige/:id_knjige", (req, res) => {
  const id_knjige = req.params.id_knjige;
  const query = "SELECT * FROM knjige WHERE id = ?";
  connection.query(query, [id_knjige], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.get("/api/rezerv_knjige", (req, res) => {
  const query = "SELECT * FROM knjiga INNER JOIN rezervacija ON knjiga.id = rezervacija.knjiga";
  connection.query(query, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.get("/api/rezerv_knjige_korisnici", (req, res) => {
  const query = `
    SELECT * 
    FROM knjiga 
    INNER JOIN rezervacija ON knjiga.id = rezervacija.knjiga 
    INNER JOIN korisnik ON korisnik.id = rezervacija.korisnik
  `;
  connection.query(query, (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.get("/api/rezerv_knjige/korisnik/:id_korisnik", (req, res) => {
  const id_korisnik = req.params.id_korisnik;
  const query = `
    SELECT * 
    FROM knjiga 
    INNER JOIN rezervacija ON knjiga.id = rezervacija.knjiga 
    INNER JOIN korisnik ON korisnik.id = rezervacija.korisnik 
    WHERE korisnik.id = ?
  `;
  connection.query(query, [id_korisnik], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.get("/api/rezerv_knjige/knjiga/:id_knjige", (req, res) => {
  const id_knjige = req.params.id_knjige;
  const query = `
    SELECT * 
    FROM knjiga 
    INNER JOIN rezervacija ON knjiga.id = rezervacija.knjiga 
    INNER JOIN korisnik ON korisnik.id = rezervacija.korisnik 
    WHERE knjiga.id = ?
  `;
  connection.query(query, [id_knjige], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
});

app.put("/api/korisnici/:id_korisnik", (req, res) => {
  const idKorisnik = req.params.id_korisnik;
  const { ime, prezime, email } = req.body;

  if (!ime || !prezime || !email) {
    return res.status(400).json({ error: "Molimo unesite sve podatke (ime, prezime, email)." });
  }

  const query = "UPDATE korisnik SET ime = ?, prezime = ?, email = ? WHERE id = ?";
  connection.query(query, [ime, prezime, email, idKorisnik], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
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
    return res.status(400).json({ error: "Molimo unesite sve podatke (id_korisnik, datum_rezervacije)." });
  }

  const query = "INSERT INTO rezervacija (datum_rezervacije, knjiga, korisnik) VALUES (?, ?, ?)";
  connection.query(query, [datum_rezervacije, idKnjige, id_korisnik], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: "Rezervacija uspešno dodata.", rezervacija_id: results.insertId });
  });
});

app.delete("/api/rezerv_knjige/:id_knjiga", (req, res) => {
  const idKnjiga = req.params.id_knjiga;
  const query = "DELETE FROM rezervacija WHERE knjiga = ?";
  connection.query(query, [idKnjiga], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Rezervacija za ovu knjigu nije pronađena." });
    }
    res.json({ message: "Rezervacija uspešno obrisana." });
  });
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
