import {createLogger} from "../logger/logger.js";
const secret = 'Something only I know';

export function createService () {
    const logger = createLogger("MyService");
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
