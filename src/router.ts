import * as express from 'express';
import {
  add as addActions,
  edit as editActions,
  remove as removeActions,
  get as getActions,
} from './routes/actions';
import {
  add as addEvents,
  edit as editEvents,
  remove as removeEvents,
  get as getEvents,
} from './routes/events';
import {
  add as addLocations,
  edit as editLocations,
  remove as removeLocations,
  get as getLocations,
} from './routes/locations';
import {
  add as addItems,
  edit as editItems,
  remove as removeItems,
  get as getItems,
} from './routes/items';
import {
  add as addEnemies,
  edit as editEnemies,
  remove as removeEnemies,
  get as getEnemies,
} from './routes/enemies';
import {
  add as addNpcs,
  edit as editNpcs,
  remove as removeNpcs,
  get as getNpcs,
} from './routes/npcs';

const router = express.Router();

router.post('/actions', addActions);
router.put('/actions', editActions);
router.delete('/actions', removeActions);
router.get('/actions', getActions);

router.post('/events', addEvents);
router.put('/events', editEvents);
router.delete('/events', removeEvents);
router.get('/events', getEvents);

router.post('/locations', addLocations);
router.put('/locations', editLocations);
router.delete('/locations', removeLocations);
router.get('/locations', getLocations);

router.post('/items', addItems);
router.put('/items', editItems);
router.delete('/items', removeItems);
router.get('/items', getItems);

router.post('/enemies', addEnemies);
router.put('/enemies', editEnemies);
router.delete('/enemies', removeEnemies);
router.get('/enemies', getEnemies);

router.post('/npcs', addNpcs);
router.put('/npcs', editNpcs);
router.delete('/npcs', removeNpcs);
router.get('/npcs', getNpcs);

export default router;
