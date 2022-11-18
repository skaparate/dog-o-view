export interface Config {
    apiUrl: string;
}

const config: Config = {
    apiUrl: process.env.REACT_APP_DOG_API_URL || '',
};

export default config;
