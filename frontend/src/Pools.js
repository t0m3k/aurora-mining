import * as Flypool from './controllers/Flypool';

export async function getFlypool(address) {
    return Flypool.get(address);
}