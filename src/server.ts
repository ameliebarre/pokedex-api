import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';

import PokemonRouter from './routes/pokemon-router';
import UserRouter from './routes/auth-router';
import TypeRouter from "./routes/type-router";

import { AuthMiddleware } from "./middlewares/auth-middleware";

//Require dotenv
require('dotenv').config();

class Server {

    public app: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/pokedex';

    public auth = new AuthMiddleware();

    constructor() {
        this.app = express();

        this.mongoSetup();
        this.config();
        this.models();
        this.routes();
    }

    public config() {
        this.app.all('/api/*', this.auth.checkToken);

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({limit:'5mb', type:'application/json'}));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Pass to next layer of middleware
            next();
        });
    }

    public models() {
        require('./models/Pokemon');
        require('./models/Type');
        require('./models/User');
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        this.app.use('/', router);
        this.app.use('/api/pokemons', PokemonRouter);
        this.app.use('/auth', UserRouter);
        this.app.use('/types', TypeRouter);
    }

    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl);

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'Connection error : '));
        db.once('open', function () {
            console.log('Connection ok!');
        });
    }
}

export default new Server().app;