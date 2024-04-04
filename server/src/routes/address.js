import { Router } from 'express';
import { getAddressDetail, getCities, getDistricts, getWards } from '../app/controllers/address.js';

const router = Router();

router.get('/cities', getCities);
router.get('/districts', getDistricts);
router.get('/wards/:code', getAddressDetail);
router.get('/wards', getWards);

export default router;
