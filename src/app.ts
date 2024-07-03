import express, { Request, Response, NextFunction } from 'express';
import connectDB from './configuratie/database/database';
import routes from './routes';
import dotenv from 'dotenv';
import morgan from 'morgan';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Layer = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteHandler = any;

dotenv.config();

const app = express();
const poort = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Ontvangen verzoek:', {
    methode: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
  });
  next();
});

app.use('/api/v1', routes);

app.use((req: Request, res: Response) => {
  res.status(404).send('Sorry, die pagina kunnen we niet vinden!');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((fout: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Globale error handler:', fout);
  res.status(500).json({ message: 'Er is een serverfout opgetreden', error: fout.message });
});

connectDB()
  .then(() => {
    app.listen(poort, () => {
      console.log(`Server draait op poort ${poort}`);
      console.log('Beschikbare routes:');
      function print(pad: string, laag: Layer) {
        if (laag.route) {
          laag.route.stack.forEach((item: RouteHandler) => {
            console.log('%s %s', item.method.toUpperCase().padEnd(6), pad.concat(laag.route.path));
          });
        } else if (laag.name === 'router' && laag.handle.stack) {
          laag.handle.stack.forEach((item: Layer) => {
            print(pad.concat(laag.regexp.source.replace('^', '').replace('/?(?=\\/|$)', '')), item);
          });
        }
      }
      app._router.stack.forEach((item: Layer) => {
        print('', item);
      });
    });
  })
  .catch((fout) => {
    console.error('Fout bij het starten van de server:', fout);
    process.exit(1);
  });

export default app;
