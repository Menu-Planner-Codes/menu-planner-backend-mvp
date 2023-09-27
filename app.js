const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes'); // Import userRoutes
const dishRoutes = require('./src/routes/dishRoutes'); // Import userRoutes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

require('./src/config/config')

// Use the userRoutes for user-related routes
app.use('/api/users', userRoutes);

app.use('/api/dishes', dishRoutes);

app.get('/', (req, res) => res.send('Home'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
