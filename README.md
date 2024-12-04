# czu-lib

A JavaScript library for logging in and fetching schedules from Czech University of Life Sciences Prague's university information system (ČZU UIS).

## Installation

```bash
npm install czu-lib
```

## Usage

```javascript
const czu = require("czu-lib");

(async () => {
  const cookies = await czu.login("xname001", "p455w0rd");

  const schedule = await czu.fetchSchedule(
    cookies,
    "1.1.2024",
    "30.12.2024",
    "en" /*Language optional (default Czech)*/
  );

  console.log(schedule);
})();
```

## Goals

- provide quick way to get login session
- make life easier by alowing you to get your schedule in JSON
- easy and simple to understand
