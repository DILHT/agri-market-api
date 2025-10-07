import app from './express.js'
import config from '../config/config.js'
import sequelize from '../config/database.js'
import "./models/association.js"

const startServer = async() =>{
    try{

        await sequelize.sync();
        console.log("Database synced");

        app.listen(config.port, () => {
    console.log(`Server running in ${config.env} mode on port ${config.port}`)
})

    }catch(error){
        console.error("Failed to start the server",error )
    }
};


startServer();
