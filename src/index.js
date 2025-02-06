import express from 'express'
import hanldebars from 'express-handlebars'

import routes from './routes.js';

const app = express();

// Hanldebars setup 
app.engine('hbs', hanldebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

// Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);


app.listen(3000, ()=> console.log('Server is listening on http://localhost:3000...')); 