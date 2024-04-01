import devConfig from "./dev.json";
import prodConfig from "./prod.json";

interface Config {
    apiUrl: string;
}

const devConfigObject: Config = {
    apiUrl: devConfig.baseURL,
};

const prodConfigObject: Config = {
    apiUrl: prodConfig.baseURL,
};


const config: Config = process.env.NODE_ENV === 'production' ? prodConfigObject : devConfigObject;

export default config;
