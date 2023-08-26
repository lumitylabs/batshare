const { db } = require('../config/firebase');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'max-age=86400, public');
  try {
    const ref = db.ref("/projects-small");
    const start = Date.now();
    
    const snapshot = await ref
      .orderByChild("status")
      .equalTo("active")
      .once("value");
      
    const end = Date.now();
    console.log("Tempo de Consulta:", end - start, "ms");

    res.json(snapshot.val());
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).send('Erro ao buscar os projetos.');
  }
};