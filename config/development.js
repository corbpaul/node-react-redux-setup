// IMPORT DEPENDENCIES
// ==============================================

import path from 'path';





// CONFIG
// ==============================================

export default {
    app: {
        host: '0.0.0.0',
        port: 3015
    },
    logs: {
        folder: path.join(__dirname, '../logs'),
        streams: [
            {
                level: 'debug',
                stream: process.stdout
            }
        ]
    }
};
