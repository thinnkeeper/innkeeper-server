import { BasicRoute } from '../types';

/**
 * Test.
 * @param req
 */
export const add = async ({ req, res }: BasicRoute): Promise<void> => {
  res.status(200).send(':3');
};

/**
 *
 * @param param0
 */
export const edit = async ({ req, res }: BasicRoute): Promise<void> => {
  res.status(200).send(':3');
};

/**
 *
 * @param param0
 */
export const remove = async ({ req, res }: BasicRoute): Promise<void> => {
  res.status(200).send(':3');
};

/**
 *
 * @param req - must be an array of strings which are IDs of the items we want to get.
 * If array's length is zero then return everything.
 */
export const get = async (req, res): Promise<void> => {
  console.log(req);
  res.status(200).send(req.body);
};
