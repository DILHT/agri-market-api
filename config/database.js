import Sequalize from 'sequelize'
import config from './config.js'

const sequelize = new Sequalize(config.db.name,config.db.username,config.db.password,{
    host:config.db.host,
    dialect:config.db.dialect
});

try{
    await sequelize.authenticate();
    console.log('connection has been established successfully !!');

}catch(error){
    console.error('Unable to connect to the databse: ', error);
}


export default sequelize;