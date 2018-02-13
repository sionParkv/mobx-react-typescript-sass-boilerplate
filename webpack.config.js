switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'prod'});
    break;
  case 'staging':
    module.exports = require('./config/webpack.stag')({env: 'staging'});
    break;
  case 'local':
  default:
    module.exports = require('./config/webpack.dev')({env: 'local'});
}