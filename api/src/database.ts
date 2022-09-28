import mongoose from 'mongoose';
import config from './config';
//import ConnectionOptions from 'mongoose';

(async () => {
    try {
        //const mongooseOptions: ConnectionOptions = {
        //   useUnifiedTopology: true,
        //   useNewUrlParser: true
        //}
        const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
    console.log('DataBase is connected... 👻 to: ', db.connection.name)
    } catch (error) {
        console.error(error)
    }
}) ()

