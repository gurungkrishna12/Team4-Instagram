const express = require('express');
const homePage = express();

homePage.get('/', (req, res) => res.send('Hello, its a beautiful day, I am loving it'));

const port = 5100;
homePage.listen(port, () => console.log(`Server is running on port ${port}`));

