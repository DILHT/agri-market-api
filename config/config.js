import dotenv from 'dotenv'

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    
    db: {
        host: process.env.DB_HOST || 'localhost',
        dialect:'postgres',
        name:process.env.DB_NAME,
        username:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD

    }
}


export default config