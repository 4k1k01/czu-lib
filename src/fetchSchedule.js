const axios = require('axios');
const tough = require('tough-cookie');
const cheerio = require('cheerio');
const processResponseData = require('./components/processResponseData');

async function fetchSchedule(cookies, date_from, date_to, lang = 'cz') {
  if (!cookies) {
    throw new Error("Missing 'cookies' - use login function to get them");
  }
  
  if (!date_from || !date_to) {
    throw new Error("Missing 'from' or 'to' dates");
  }

  const BASE_URL = 'https://is.czu.cz/auth';
  let rozvrhStudent = null;

  const cookieString = cookies.cookies.map(cookie => `${cookie.key}=${cookie.value}`).join('; ');

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'Cookie': cookieString,
  };

  try {
    const response = await axios.get(`${BASE_URL}/student/moje_studium.pl`, {
      headers: headers,
    });
    
    const $ = cheerio.load(response.data);

    const link = $('a[href*="rozvrh_student="]').attr('href');

    if (link) {
        const match = link.match(/rozvrh_student=(\d+)/);
        if (match) {
            rozvrhStudent = match[1];
        } else {
            console.log("rozvrh_student number not found");
        }
    } else {
        console.log("Couldn't find link");
    }

    if (!rozvrhStudent) {
      throw new Error("rozvrhStudent not found");
    }

    const scheduleData = new URLSearchParams({
      nezvol_all: "0",
      zvol_all: "0",
      format: "list",
      typ_vypisu: "konani",
      rozvrh_student: rozvrhStudent,
      konani_od: date_from,
      konani_do: date_to,
      zobraz: "1",
      rezervace: "0",
      poznamky_zmeny: "1",
      poznamky_parovani: "1",
      poznamky_jiny_areal: "1",
      poznamky_dl_omez: "1",
      lang: lang,
      zobraz2: "Zobrazit",
    });

    const scheduleResponse = await axios.post(`${BASE_URL}/katalog/rozvrhy_view.pl`, scheduleData.toString(), {
      headers: headers,
    });

    const processedScheduleData = await processResponseData(scheduleResponse.data);
    return processedScheduleData;
  } catch (error) {
    console.error('Error fetching the schedule:', error);
    throw error;
  }
}

module.exports = fetchSchedule;