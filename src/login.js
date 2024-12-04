const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

async function login(username, password) {
  if (!username || !password) {
    throw new Error('Missing username or password');
  }

  const URL = 'https://is.czu.cz/system/login.pl';

  const formData = new URLSearchParams({
    login_hidden:	'1',
    destination: '/auth/',
    credential_0: username,
    credential_1: password,
    credential_k:	'',
    credential_2: '86400',
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  };

  try {
    const response = await client.post(URL, formData.toString(), {
      headers: headers,
      maxRedirects: 5,
      validateStatus: (status) => status >= 200 && status < 400,
      withCredentials: true,
    });

    return jar.toJSON();
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

module.exports = login;