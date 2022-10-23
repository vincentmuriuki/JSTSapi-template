import express = require('express');
import catchErrors from '../../../utils/helper';
import funController from '../../controllers/FunController';

const router = express.Router();

router.get('/', catchErrors(funController.sendFunMessage));

export default router;
