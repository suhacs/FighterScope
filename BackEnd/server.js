const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();
require('dotenv').config();

const db = require('./fighter/app/models');
const Role = db.role;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
    initializeRoles();
  })
  .catch((err) => {
    console.log('Can not connect to the database', err);
    process.exit();
  });

async function initializeRoles() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      try {
        const userRole = new Role({
          name: 'user',
        });
        await userRole.save();
        console.log(`added 'user' to roles collection`);
      } catch (err) {
        console.error('Error saving user role:', err); // Changed variable name
      }

      try {
        const adminRole = new Role({
          name: 'admin',
        });
        await adminRole.save(); // Changed variable name
        console.log(`added 'admin' to roles collection`);
      } catch (err) {
        console.error('Error saving admin role:', err); // Changed variable name
      }
    }
  } catch (err) {
    console.error('Error checking document count or saving roles:', err);
  }
}

app.use(
  cors({
    credentials: true,
    origin: ['https://fighter-scope.onrender.com'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'Fighter-Scope',
    secret: process.env.secret,
    httpOnly: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Fighter Scope' });
});

require('./fighter/app/routes/auth.routes')(app);
require('./fighter/app/routes/fighter.routes')(app);
require('./fighter/app/routes/schedule.routes')(app);
require('./fighter/app/routes/user.route')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
