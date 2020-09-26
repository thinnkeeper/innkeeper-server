import { NPC } from '../types';
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

type NPCSSchema = {
  npcs: NPC[];
};

/**
 * You can add more than one NPC at once.
 * @param req
 */
export const add = async (req, res): Promise<void> => {
  const { npcs }: NPCSSchema = req.body;
  // add the body validation!!!!
  let response;

  if (npcs.length === 0) {
    res.status(304).send({
      error: "You didn't specify any NPCs to add.",
    });
    return;
  }
  if (!Array.isArray(npcs)) {
    res.status(304).send({
      error: 'The body must be an array, even if you ',
    });
    return;
  }
  if (npcs.length === 1) {
    response = await insertOne(collection, npcs[0]);
  } else {
    response = await insertMany(collection, npcs);
  }
  res.status(201).send(response);
};

/**
 * You can edit only one NPC at once.
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
  const npc = await getOne(collection, id);
  const npcUpdated = {
    ...npc[0],
    ...req.body,
  };
  console.log(req.body);
  console.log(npcUpdated);
  await upsertOne(collection, { id }, npcUpdated);
  res.status(200).send(npcUpdated);
};

/**
 * You can delete plenty of NPCs at once.
 * Body: string[ ] (those are all IDs)
 */
export const remove = async (req, res): Promise<void> => {
  const ids = req.body.ids;
  if (ids.length === 0) {
    res.status(400).send({
      error: "You didn't specify any NPCs to delete.",
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
 * Returns all NPCs if req.body.ids is undefined or length 0.
 * If req.body.ids is bigger than zero returns all NPCs which ids have been specified.
 */
export const get = async (req, res): Promise<void> => {
  const ids = req.body.ids;
  let npcs;
  // add the body validation!!!!

  if (!ids) {
    res.status(400).send({
      error:
        'You need to specify the list of documents IDs that you want to retrieve. The list must be empty if you want to get all documents.',
    });
    return;
  }
  if (ids.length === 0) {
    npcs = await getEntireCollection(collection);
  } else {
    npcs = await getMany(collection, ids);
  }
  res.status(200).send(npcs);
};
