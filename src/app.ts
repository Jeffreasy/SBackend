import express from 'express';
import connectDB from './configuratie/database/database';
import routes from './routes';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const poort = process.env.PORT || 3000;

// Verbind met MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Voegt logging toe voor inkomende verzoeken

// Nieuwe middleware voor uitgebreide logging
app.use((req, res, volgende) => {
  console.log('Ontvangen verzoek:', {
    methode: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers
  });
  volgende();
});

// Routes
app.use('/api/v1', routes);

// 404 afhandelaar
app.use((req, res, volgende) => {
  res.status(404).send("Sorry, die pagina kunnen we niet vinden!");
});

// Algemene foutafhandeling
app.use((fout: any, req: express.Request, res: express.Response, volgende: express.NextFunction) => {
  console.error('Globale error handler:', fout);
  res.status(500).json({ message: 'Er is een serverfout opgetreden', error: fout.message });
});

// Server opstarten
connectDB().then(() => {
  app.listen(poort, () => {
    console.log(`Server draait op poort ${poort}`);
    console.log('Beschikbare routes:');
    function print(pad: string, laag: any) {
      if (laag.route) {
        laag.route.stack.forEach((item: any) => {
          console.log('%s %s', item.method.toUpperCase().padEnd(6), pad.concat(laag.route.path));
        });
      } else if (laag.name === 'router' && laag.handle.stack) {
        laag.handle.stack.forEach((item: any) => {
          print(pad.concat(laag.regexp.source.replace("^", "").replace("/?(?=\\/|$)", "")), item);
        });
      }
    }
    app._router.stack.forEach((item: any) => {
      print('', item);
    });
  });
}).catch(fout => {
  console.error('Fout bij het starten van de server:', fout);
  process.exit(1);
});

export default app;