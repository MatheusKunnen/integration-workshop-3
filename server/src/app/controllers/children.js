import ChildrenRepository from "../models/childrenModel.js";

function findAll(req, res) {
  ChildrenRepository.findAll().then((result) => res.json(result));
}

export default { findAll };
