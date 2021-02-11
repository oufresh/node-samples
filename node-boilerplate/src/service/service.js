const logger = require("simple-node-logger").createSimpleLogger();

const secret = 'Something only I know';

module.exports = function createService() {
    
    let attempt = 0;
  
    const isSecret = (guess) => {
      attempt = attempt + 1;
      logger.info(attempt, 'Guessing secret');
      return (guess === secret);
    };
  
    return {
      isSecret,
    };
  };


