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
 * @param param0
 */
export const get = async ({ req, res }: BasicRoute): Promise<void> => {
  res.status(200).send(':3');
};
