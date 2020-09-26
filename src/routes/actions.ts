import { Action } from '../types';
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

const collection = 'actions';

type ActionsSchema = {
  actions: Action[];
};

/**
 * You can add more than one action at once.
 * @param req
 */
export const add = async (req, res): Promise<void> => {
  const { actions }: ActionsSchema = req.body;
  // add the body validation!!!!
  let response;

  if (actions.length === 0) {
    res.status(304).send({
      error: "You didn't specify any actions to add.",
    });
    return;
  }
  if (!Array.isArray(actions)) {
    res.status(304).send({
      error: 'The body must be an array, even if you add only one action.',
    });
    return;
  }
  if (actions.length === 1) {
    response = await insertOne(collection, actions[0]);
  } else {
    response = await insertMany(collection, actions);
  }
  res.status(201).send(response);
};

/**
 * You can edit only one action at once.
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
  const action = await getOne(collection, id);
  const actionUpdated = {
    ...action[0],
    ...req.body,
  };
  console.log(req.body);
  console.log(actionUpdated);
  await upsertOne(collection, { id }, actionUpdated);
  res.status(200).send(actionUpdated);
};

/**
 * You can delete plenty of action at once.
 * Body: string[ ] (those are all IDs)
 */
export const remove = async (req, res): Promise<void> => {
  const ids = req.body.ids;
  if (ids.length === 0) {
    res.status(400).send({
      error: "You didn't specify any actions to delete.",
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
 * Returns all actions if req.body.ids is undefined or length 0.
 * If req.body.ids is bigger than zero returns all actions which ids have been specified.
 */
export const get = async (req, res): Promise<void> => {
  const ids = req.body.ids;
  let actions;
  // add the body validation!!!!

  if (!ids) {
    res.status(400).send({
      error:
        'You need to specify the list of documents IDs that you want to retrieve. The list must be empty if you want to get all documents.',
    });
    return;
  }
  if (ids.length === 0) {
    actions = await getEntireCollection(collection);
  } else {
    actions = await getMany(collection, ids);
  }
  res.status(200).send(actions);
};
