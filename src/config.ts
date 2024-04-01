interface Config {
    apiUrl: string;
}

const devConfig: Config = {
    apiUrl: 'http://localhost:8080',
};

const prodConfig: Config = {
    apiUrl: 'https://msfl-loca.lt',
};

const config: Config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;