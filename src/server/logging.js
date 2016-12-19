// IMPORT DEPENDENCIES
// ==============================================

import Bunyan from 'bunyan';
import config from '../config';





// CREATE LOGGER
// ==============================================

export default Bunyan.createLogger({
    name: 'react',
    streams: config.default.logs.streams
});
