// IMPORT DEPENDENCIES
// ==============================================

import path from 'path';





// CONFIG
// ==============================================

export default {
    app: {
        siteId: 0
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
