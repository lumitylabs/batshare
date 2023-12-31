const { db } = require("../config/firebase");
const getDate = require("../utils/utils");
const cors = require("../config/cors").default;

module.exports = cors(async (req, res) => {
    var { day, month, year } = getDate();
    var bat_value = 0
    var amount = 0
    var projectQuadratic = 0
    res.setHeader('Cache-Control', 's-maxage=86400');
  try {
    var url = req.body.url;
    const ref = db.ref(`/total-raised-daily/${year}/${month}/${day}/`);
    await ref.once("value", async function (snapshot) {
        if (snapshot.exists()) {
            bat_value = snapshot.val().bat_value
            amount = snapshot.val().amount
            const projectRaised = db.ref(`/project-raised/${year}/${month}/${day}/${url}`);
            await projectRaised.once("value", function (projectSnapshot) {
                if (projectSnapshot.exists()) {
                    projectQuadratic = projectSnapshot.val().amount;
                    res.send({projectQuadratic, bat_value, amount});

                }
                else{
                  res.send({projectQuadratic: 0, bat_value, amount});
              }
            });
                
            
        } else {
            res.send({projectQuadratic, bat_value, amount});
        }
        
      });

  } catch (error) {
    res.status(500).send("Error getting inventory");
  }
});
