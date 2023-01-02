export default () => ({
    env: process.env.NODE_ENV,
    appName: process.env.APP_NAME,
    port: parseInt(process.env.PORT, 10) || 3000,
    secret: process.env.SECRET,
    magicLoginSecret: process.env.MAGIC_LOGIN_SECRET,
    magicLoginFrontend: process.env.MAGIC_LOGIN_FRONTEND,
    jwtExpiration: "15d",
    database: {
        type: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 1433,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: ["dist/**/*.entity.js"],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
        options: {
            encrypt: false, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    },
});