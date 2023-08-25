const createComment = require("./_create-comment");
const createProject = require("./_create-project");
const createUpdate = require("./_create-update");
const createUser = require("./_create-user");
const donate = require("./_donate");
const upload = require("./_upload");


module.exports = async (req, res) => {
  const action = req.query.action;

  if (action === "create-comment") {
    await createComment(req, res);
  }
  if (action === "create-project") {
    await createProject(req, res);
  }
  if (action === "create-update") {
    await createUpdate(req, res);
  }
  if (action === "create-update") {
    await createUser(req, res);
  }
  if (action === "create-user") {
    await donate(req, res);
  }
  if (action === "donate") {
    await upload(req, res);
  }
};
