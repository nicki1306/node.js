import path  from 'path';
import * as url from 'url';

const config = {
    PORT: 8080,
    DIRNAME: path.dirname(url.fileURLToPath(import.meta.url)),

    get UPLOAD_DIR() {
        return path.join(this.DIRNAME, 'public');
    }
};

export default config;