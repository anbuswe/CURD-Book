import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "309521",
    database: "test"
});

// if there is an authentication problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '309521';
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + db.threadId);
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("hello server");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Book created successfully" });
    });
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Book deleted successfully" });
    });
});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`=?, `desc`=?, `cover`=? WHERE id=?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Book updated successfully" });
    });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
