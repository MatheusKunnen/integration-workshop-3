import SnacksRepository from "../models/snacksModel.js";

function findAll(req, res) {
  SnacksRepository.findAll().then((result) => res.json(result));
}

export default { findAll };
