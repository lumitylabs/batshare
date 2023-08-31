const { db } = require("../config/firebase");
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "max-age=86400, public");

  var projectsRaised = null;
  var totalRaisedAmount = 0;
  var totalRaisedValue = 0;
  const currentDate = new Date().toISOString().split("T")[0];
  const yestedayDate = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split("T")[0];

  const [yesterdayYear, yestedayMonth, yesterdayDay] = yestedayDate
    .split("-")
    .map((part) => parseInt(part).toString());

  const total_raised_daily = db.ref(
    `/total-raised-daily/${yesterdayYear}/${yestedayMonth}/${yesterdayDay}/`
  );
  await total_raised_daily.once("value", async function (snapshot) {
    if (snapshot.exists()) {
      totalRaisedAmount = snapshot.val().amount;
      totalRaisedValue = snapshot.val().bat_value;
    }
  });

  const projectsRef = db.ref(
    `/project-raised/${yesterdayYear}/${yestedayMonth}/${yesterdayDay}`
  );
  await projectsRef.once("value", async function (snapshot) {
    if (snapshot.exists()) {
      projectsRaised = snapshot.val();
    }
  });

  try {
    const ref = db.ref("/projects");
    const snapshot = await ref.once("value");
    const value = snapshot.val();

    const promises = Object.keys(value).map(async (url) => {
      const projectData = value[url];
      if (projectData.lastUpdate !== currentDate) {
        if (url in projectsRaised) {
          const lastTotalRaised = projectData.totalRaised;
          const lastAvailableBalance = projectData.availableBalance;
          return updateProject(
            url,
            totalRaisedAmount,
            totalRaisedValue,
            projectsRaised[url].amount,
            lastTotalRaised,
            lastAvailableBalance
          );
        } else {
          var ref = db.ref("/projects/" + url);
          await ref.update({
            lastUpdate: currentDate,
          });
        }
      } else {
        console.log(url, " already updated");
        return Promise.resolve();
      }
    });

    await Promise.all(promises);

    res.json({ status: "updated" });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send("Error getting projects");
  }
};

async function updateProject(
  url,
  totalRaisedAmount,
  totalRaisedValue,
  projectRaised,
  lastTotalRaised,
  lastAvailableBalance
) {
  var ref = db.ref("/projects/" + url);
  const currentDate = new Date().toISOString().split("T")[0];
  if (totalRaisedAmount > 0) {
    const addValue = (projectRaised / totalRaisedAmount) * totalRaisedValue;
    await ref.update({
      lastUpdate: currentDate,
      totalRaised: parseFloat(lastTotalRaised) + addValue,
      availableBalance: parseFloat(lastAvailableBalance) + addValue,
    });
  }
}
