import * as express from 'express';
import { verifyUser } from '../../middlewares/checkToken';
import catchErrors from '../../../utils/helper';
import twoFAController from '../../controllers/2FaController';
import { validation } from '../../validation/validation';

const router = express.Router();
const { totpSetup, totpVerify, totpGet, totpDisable, totpSendTokenText } = twoFAController;

router.patch('/2fa/totp/setup', verifyUser, catchErrors(totpSetup));

router.get('/2fa/totp/setup', verifyUser, catchErrors(totpGet));

router.patch('/2fa/totp/disable', verifyUser, catchErrors(totpDisable));

router.post('/2fa/totp/verify', verifyUser, validation, catchErrors(totpVerify));

router.post('/2fa/totp/send-token-text', verifyUser, catchErrors(totpSendTokenText));

export default router;