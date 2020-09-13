import { MongoClient, Db } from 'mongodb';
import { v4 as uuid } from 'uuid';
import * as config from './config.json';

let db: Db;

/**
 * Must be invoked at least once in the app before using any of the methods below.
 * Invocation preffered at the app's entry point.
 */
export const connectToDb = async (): Promise<void> => {
  const client = await MongoClient.connect(config.DB_URL);
  db = client.db(config.DB_NAME);
};

export async function getEntireCollection(collection: string): Promise<any[]> {
  return await db.collection(collection).find().toArray();
}

/**
 * Returns one document from database.
 * @param collection string: collection's name
 * @param id string: id of the item to find
 */
export async function getOne(collection: string, id: string): Promise<any> {
  return await db.collection(collection).find({ id }).toArray();
}

/**
 * Returns all the documents from collection from the list of IDs passed into body.
 * @param collection string: collection's name
 * @param ids string[]: ids of the items to find
 */
export async function getMany(collection: string, ids: string[]): Promise<any> {
  const allItems = await db.collection(collection).find().toArray();
  const filteredItems = allItems.filter((item: any) => ids.includes(item.id));
  return filteredItems;
}

/**
 * Creates a new document in the collection and gives it unique ID.
 * @param collection string: collection's name
 * @param document object: document to create
 */
export async function insertOne<T>(
  collection: string,
  document: T,
): Promise<T> {
  const id = uuid();
  const documentWithId = {
    ...document,
    id,
  };
  await db.collection<T>(collection).insertOne(documentWithId);
  return documentWithId;
}

/**
 * Creates many new documents in the collection and gives them unique IDs.
 * @param collection string: collection's name
 * @param documents object[]: documents to create
 */
export async function insertMany<T>(
  collection: string,
  documents: T[],
): Promise<T[]> {
  const documentsWithIds = documents.map((document) => ({
    ...document,
    id: uuid(),
  }));
  await db.collection<T>(collection).insertMany(documentsWithIds);
  return documentsWithIds;
}

/**
 * Updates one document in the collection. Filters by anything but using ID is recommended.
 * @param collection string: collection's name
 * @param filter { [key: string]: string }: filter by which the document should be updated (using ID recommended)
 * @param object object: fields of the document to update
 */
export async function upsertOne<T>(
  collection: string,
  filter: { [key: string]: string },
  object: T,
): Promise<void> {
  await db
    .collection<T>(collection)
    .updateOne(filter, { $set: object }, { upsert: true });
}

/**
 * Updates many documents in the collection. Filters by anything but using IDs is recommended.
 * @param collection string: collection's name
 * @param filter { [key: string]: string }: filted by which documents should be updated (using IDs recommended)
 * @param object object: all the documents to update
 */
export async function upsertMany<T>(
  collection: string,
  filter: any,
  object: T,
): Promise<void> {
  await db
    .collection<T>(collection)
    .updateMany(filter, { $set: object }, { upsert: true });
}

/**
 * Deletes a document from collection by its ID.
 * @param collection string: collection's name
 * @param id string: unique ID
 */
export async function deleteOne<T>(
  collection: string,
  id: string,
): Promise<void> {
  await db.collection<T>(collection).deleteMany({ id });
}

/**
 * Deletes documents from collection by their IDs.
 * @param collection string: collection's name
 * @param id string[]: unique IDs
 */
export async function deleteMany<T>(
  collection: string,
  ids: string[],
): Promise<void> {
  await db.collection<T>(collection).deleteMany(ids);
}
