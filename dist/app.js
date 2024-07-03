"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./configuratie/database/database"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const poort = process.env.PORT || 3000;
// Verbind met MongoDB
(0, database_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev')); // Voegt logging toe voor inkomende verzoeken
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
app.use('/api/v1', routes_1.default);
// 404 afhandelaar
app.use((req, res, volgende) => {
    res.status(404).send("Sorry, die pagina kunnen we niet vinden!");
});
// Algemene foutafhandeling
app.use((fout, req, res, volgende) => {
    console.error('Globale error handler:', fout);
    res.status(500).json({ message: 'Er is een serverfout opgetreden', error: fout.message });
});
// Server opstarten
(0, database_1.default)().then(() => {
    app.listen(poort, () => {
        console.log(`Server draait op poort ${poort}`);
        console.log('Beschikbare routes:');
        function print(pad, laag) {
            if (laag.route) {
                laag.route.stack.forEach((item) => {
                    console.log('%s %s', item.method.toUpperCase().padEnd(6), pad.concat(laag.route.path));
                });
            }
            else if (laag.name === 'router' && laag.handle.stack) {
                laag.handle.stack.forEach((item) => {
                    print(pad.concat(laag.regexp.source.replace("^", "").replace("/?(?=\\/|$)", "")), item);
                });
            }
        }
        app._router.stack.forEach((item) => {
            print('', item);
        });
    });
}).catch(fout => {
    console.error('Fout bij het starten van de server:', fout);
    process.exit(1);
});
exports.default = app;
