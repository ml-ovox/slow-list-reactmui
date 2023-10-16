export let data: any[] = [];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// generate n random strings of random length < 15 chars in one string;
function getRandomString(n: number) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += Math.random().toString(36).substring(2, 15) + " ";
  }
  return result;
}

// generate a random date between 2020 and 2024 in 2021-08-11T14:12:55.000Z format
function getRandomDate() {
  const start = new Date(2020, 0, 1);
  const end = new Date(2024, 0, 1);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
}

for (let i = 0; i < 1000; i++) {
  data.push({
    id: i + 1,
    Name: `Task ${getRandomInt(23409)}`,
    IsDone: getRandomInt(1000) < 500 ? "Yes" : "No",
    "Frontend Done": getRandomInt(1000) < 500 ? "Yes" : "No",
    "Backend done": getRandomInt(1000) < 500 ? "Yes" : "No",
    Comment: getRandomString(20),
    Type: ["feature", "bug", "other"][getRandomInt(3)],
    Priority: ["P1", "P2", "P3", "P4", "P5"][getRandomInt(5)],
    createdAt: getRandomDate(),
    "Base Project": ["Myproject1", "Myproject2", "Myproject3"][getRandomInt(3)],
    updatedAt: getRandomDate(),
    Layer: ["Frontend", "Backend", "FullStack", "3rdparty", "Devops"][
      getRandomInt(5)
    ],
    ___archived: getRandomInt(1000) < 500 ? "Yes" : "No",
    "Dev comment": getRandomString(15),
    ___ordering: getRandomInt(10000),
  });
}
