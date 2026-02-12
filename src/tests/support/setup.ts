import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'qa';
const envPath = path.resolve(process.cwd(), `.env.${env}`);

dotenv.config({ path: envPath });

if (!process.env.BASE_URL) {
    throw new Error(`ERROR CRÍTICO: BASE_URL no se cargó desde ${envPath}`);
}