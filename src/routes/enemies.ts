import { Enemy } from '../types';
import {
  getEntireCollection,
  getOne,
  getMany,
  insertOne,
  insertMany,
  upsertOne,
  deleteOne,
  deleteMany,
} from '../database';

const collection = 'items';

type EnemiesSchema = {
  enemies: Enemy[];
};

/**
 * You can add more than one enemy at once.
 * @param req
 */
export const add = async (req, res): Promise<void> => {
  const { enemies }: EnemiesSchema = req.body;
  // add the body validation!!!!
  let response;

  if (enemies.length === 0) {
    res.status(304).send({
      error: "You didn't specify any enemies to add.",
    });
    return;
  }
  if (!Array.isArray(enemies)) {
    res.status(304).send({
      error: 'The body must be an array, even if you ',
    });
    return;
  }
  if (enemies.length === 1) {
    response = await insertOne(collection, enemies[0]);
  } else {
    response = await insertMany(collection, enemies);
  }
  res.status(201).send(response);
};

/**
 * You can edit only one enemy at once.
 * You can overwrite fields that are already there or add new fields, and only fields you put in body are updated.
 * TODO think of how to delete fields with the use of this one
 * Body:
 * {
 *  id: string,
 *  [fieldtoedit: string]: any
 * }
 */
export const edit = async (req, res): Promise<void> => {
  const id = req.body.id;
  const enemy = await getOne(collection, id);
  const enemyUpdated = {
    ...enemy[0],
    ...req.body,
  };
  console.log(req.body);
  console.log(enemyUpdated);
  await upsertOne(collection, { id }, enemyUpdated);
  res.status(200).send(enemyUpdated);
};

/**
 * You can delete plenty of enemies at once.
 * Body: string[ ] (those are all IDs)
 */
export const remove = async (req, res): Promise<void> => {
  const ids = req.body.ids;
  if (ids.length === 0) {
    res.status(400).send({
      error: "You didn't specify any enemies to delete.",
    });
    return;
  }
  if (ids.length === 1) {
    await deleteOne(collection, ids[0]);
  } else {
    await deleteMany(collection, ids);
  }
  res.status(200).send(ids);
};

/**
 * Returns all enemies if req.body.ids is undefined or length 0.
 * If req.body.ids is bigger than zero returns all enemies which ids have been specified.
 */
export const get = async (req, res): Promise<void> => {
  const ids = req.body.ids;
  let enemies;
  // add the body validation!!!!

  if (!ids) {
    res.status(400).send({
      error:
        'You need to specify the list of documents IDs that you want to retrieve. The list must be empty if you want to get all documents.',
    });
    return;
  }
  if (ids.length === 0) {
    enemies = await getEntireCollection(collection);
  } else {
    enemies = await getMany(collection, ids);
  }
  res.status(200).send(enemies);
};
