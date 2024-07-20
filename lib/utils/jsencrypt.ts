import JSEncrypt from 'jsencrypt';

// 密钥对生成 http://web.chacuo.net/netrsakeypair

//仅后端有对应的privateKey 用于api加密，见request.js
const onlyPublicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALuH3coppu/7FgNp4IUWU/nQDE74CyzgSHkCWkSHzGXJB/MN7g7PG8qqvJknpwtRYHAUlDeYgmLs7NmMaKyaUPsCAwEAAQ==';

//前端普通加密场景，如记住密码加密publicKey
const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAN0ALaN1RaDCNSWL2xz3Lbo3auufC6uBX1VFhyf80lO/+z6ZM79fR/dxmQhlGGMphZ+J/zuWu8JccZanh516FXMCAwEAAQ==';
//前端普通加密场景，如记住密码解密privateKey
const privateKey = 'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA3QAto3VFoMI1JYvbHPctujdq658Lq4FfVUWHJ/zSU7/7Ppkzv19H93GZCGUYYymFn4n/O5a7wlxxlqeHnXoVcwIDAQABAkABtNClZHBnL1its4i7joUB3Q+sRgwXBOaxh9nlSyRslRk0KI1U3JXaCVjtg0ozfyCLf6xDHjYSXR+Hv+JpsTzhAiEA+XEIYVVgEqvZtrgWlAUvI1BCyA2L6Yc1o0uVsRnzuYsCIQDiz7aEzDBtpQq/ea7JyZMnTif4C2ZMX/xchg21VisAuQIgfqYIZjsN440DpoVDWXZkX56xuZc/MZvn/Pg0kc4mdE8CIQDBq63lfVnI9knUMDphEd+2i1Uzx8AlbTzXYJxqAFcd+QIgaXu4/t6Sk+ZAnszltYXZUOCfC0LWfi7qaUgmHqpOqbA=';

// 加密
export function encrypt(txt: string, isSafe: boolean): string | false {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(isSafe ? onlyPublicKey : publicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对数据进行加密
}

// 解密
export function decrypt(txt: string): string | false {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  return encryptor.decrypt(txt); // 对数据进行解密
}