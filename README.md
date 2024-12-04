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
  try {
    const session = await czu.login("xname001", "p455w0rd");
    console.log("Logged in successfully!");

    const schedule = await czu.fetchSchedule(session, "1.1.2024", "30.12.2024");
    console.log("Schedule:", schedule);
  } catch (error) {
    console.error(error.message);
  }
})();
```

## Goals

- provide quick way to get login session
- make life easier by alowing you to get your schedule in JSON
- easy and simple to understand
