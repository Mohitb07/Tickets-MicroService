// configuration for refreshing the nextjs automatically inside docker container
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300; //refresh in every 300 millisecond
        return config;
    }
}