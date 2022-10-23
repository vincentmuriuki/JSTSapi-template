
/* eslint-disable camelcase, no-mixed-operators */
import * as Speakeasy from 'speakeasy';
// @ts-ignore
import * as QRCode from 'qrcode';
import dbClient from '../../database/prisma';

const encoding = 'base32';

/**
 * Two Factor Authentication Service
 */
export default {
    setupSecret: async (email: string, type: string) => {
        const { base32, otpauth_url }: any = Speakeasy.generateSecret({
            name: `TS Biolerplate - ${email}`,
            issuer: 'TS Boilerplate',
            length: 20,
        });
        const dataURL = await QRCode.toDataURL(otpauth_url);
        const updatedUser = await dbClient.users.update({
            where: {
                email
            }, data: {
                twoFAType: type,
                    twoFASecret: base32,
                    twoFADataURL: dataURL,
            }
        })
        const { phoneNumber }: any = updatedUser;

        const dataObjects: any = {
            sms_text_temp: {
                twoFAType: type,
                twoFASecret: base32,
                phoneNumber,
            },
            authenticator_app_temp: {
                twoFAType: type,
                twoFASecret: base32,
                twoFADataURL: dataURL,
            },
            none: {
                twoFAType: type,
                twoFASecret: null,
            },
        };

        return dataObjects[type];
    },
    generate: (secret: any) => ({
        token: Speakeasy.totp({
            secret,
            encoding,
        }),
        remaining: (60 - Math.floor((new Date().getTime() / 1000.0 % 60))),
    }),
    get: async (email: string) => {
        const { twoFAType, twoFASecret, phoneNumber, twoFADataURL } = await dbClient.users.findUnique({
            where: { email },
            // returning: true,
            // plain: true,
        });

        return {
            twoFAType,
            twoFASecret,
            twoFADataURL,
            phoneNumber
        };
    },
    remove: async (email: string) => {
        const resetResponse = {
            data: {
                twoFASecret: null,
                twoFAType: 'none',
                twoFADataURL: null,
            }
        };
        await dbClient.users.update(resetResponse, { where: { email } });
        return resetResponse;
    },
    // @ts-ignore
    verify: async ({ res, type, secret, token }) => {
        if (type.includes('_temp')) {
            await dbClient.users.update({ data: { twoFAType: type.split('_temp')[0] } }, { where: { email: res.locals.user.email } });
        }

        return Speakeasy.totp.verify({
            secret,
            token,
            encoding,
            window: 1,
        });
    },
};