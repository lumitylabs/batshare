const { db } = require('../config/firebase');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400');
  try {
    const ref = db.ref("/projects-small");
    ref
      .orderByChild("status")
      .equalTo("active")
      .once("value", (snapshot) => {
        res.json(snapshot.val());
      });
  } catch (error) {
    res.status(500).send('Erro ao buscar os projetos.');
  }
};