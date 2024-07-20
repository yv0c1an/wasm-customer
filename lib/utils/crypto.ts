import CryptoJS from 'crypto-js';

/**
 * 随机生成32位的字符串
 * @returns {string}
 */
const generateRandomString = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * 随机生成aes 密钥
 * @returns {CryptoJS.lib.WordArray}
 */
export function generateAesKey(): CryptoJS.lib.WordArray {
  return CryptoJS.enc.Utf8.parse(generateRandomString());
}

/**
 * 加密base64
 * @param {string | CryptoJS.lib.WordArray} obj
 * @returns {string}
 */
export function encryptBase64(obj: string | CryptoJS.lib.WordArray): string {
  // 转字符串为WordArray
  let wordArray = typeof obj === 'string' ? CryptoJS.enc.Utf8.parse(obj) : obj;
  // 转WordArray为字符串
  return CryptoJS.enc.Base64.stringify(wordArray);
}

/**
 * 解密base64 为WordArray
 * @param {string} str
 * @returns {CryptoJS.lib.WordArray}
 */
export function decryptBase64(str: string): CryptoJS.lib.WordArray {
  return CryptoJS.enc.Base64.parse(str);
}

/**
 * 解密base64为字符串
 * @param {string} str
 * @returns {string}
 */
export function decryptBase64ToString(str: string): string {
  // 转字符串为WordArray再转为Utf8字符串
  return CryptoJS.enc.Utf8.stringify(decryptBase64(str));
}

/**
 * 使用密钥对数据进行加密
 * @param {string} message
 * @param {CryptoJS.lib.WordArray} aesKey
 * @returns {string}
 */
export function encryptWithAes(message: string, aesKey: CryptoJS.lib.WordArray): string {
  const encrypted = CryptoJS.AES.encrypt(message, aesKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * 使用密钥对数据进行解密
 * @param {string} message
 * @param {CryptoJS.lib.WordArray} aesKey
 * @returns {string}
 */
export function decryptWithAes(message: string, aesKey: CryptoJS.lib.WordArray): string {
  const decrypted = CryptoJS.AES.decrypt(message, aesKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}