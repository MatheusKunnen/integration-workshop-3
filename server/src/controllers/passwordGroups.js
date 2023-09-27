import PasswordGroupsRepository from "../models/passwordGroupsModel.js";

function findAll(req, res) {
  PasswordGroupsRepository.findAll().then((result) => res.json(result));
}

export default { findAll };
