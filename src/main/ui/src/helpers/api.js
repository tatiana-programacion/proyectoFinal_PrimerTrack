const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_URL_LOCAL : process.env.REACT_APP_URL_PROD;

export default baseUrl;