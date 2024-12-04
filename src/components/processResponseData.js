const cheerio = require('cheerio');

function processResponseData(data) {
  const $ = cheerio.load(data);

  const extractSchedule = () => {
    const schedule = [];

    $('table#tmtab_1 tbody tr').each((index, element) => {
      const row = {};

      row.day = $(element).find('td').eq(0).text().trim();
      row.from = $(element).find('td').eq(1).text().trim();
      row.to = $(element).find('td').eq(2).text().trim();
      row.subject = $(element).find('td').eq(3).text().trim();
      row.action = $(element).find('td').eq(4).text().trim();
      row.room = $(element).find('td').eq(5).text().trim();
      row.teacher = $(element).find('td').eq(6).text().trim();

      schedule.push(row);
    });

    return schedule;
  };

  return extractSchedule();
}

module.exports = processResponseData;