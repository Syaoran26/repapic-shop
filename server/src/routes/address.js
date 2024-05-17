import { Router } from 'express';
import { getCities, getDistricts, getWards } from '../app/controllers/address.js';

const router = Router();

router.get('/cities', getCities);
router.get('/districts', getDistricts);
router.get('/wards', getWards);

export default router;
