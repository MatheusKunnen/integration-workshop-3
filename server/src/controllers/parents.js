import ParentsRepository from "../models/parentsModel.js";

function findAll(req, res) {
  ParentsRepository.findAll().then((result) => res.json(result));
}

function findParent(req, res) {
  ParentsRepository.findByPk(req.params.id).then((result) => res.json(result));
}

function addParent(req, res) {
  ParentsRepository.create({
    email: req.body.email,
    password: req.body.password,
  }).then((result) => res.json(result));
}

async function updateParent(req, res) {
  await ParentsRepository.update(
    {
        email: req.body.email,
        password: req.body.password,
        balance: req.body.balance,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  ParentsRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteParent(req, res) {
  await ParentsRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  ParentsRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addParent, findParent, updateParent, deleteParent };
