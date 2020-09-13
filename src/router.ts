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

router.post('/actions/add', addActions);
router.put('/actions/edit', editActions);
router.delete('/actions/remove', removeActions);
router.get('/actions/get', getActions);

router.post('/events/add', addEvents);
router.put('/events/edit', editEvents);
router.delete('/events/remove', removeEvents);
router.get('/events/get', getEvents);

router.post('/locations/add', addLocations);
router.put('/locations/edit', editLocations);
router.delete('/locations/remove', removeLocations);
router.get('/locations/get', getLocations);

router.post('/items/add', addItems);
router.put('/items/edit', editItems);
router.delete('/items/remove', removeItems);
router.get('/items/get', getItems);

router.post('/enemies/add', addEnemies);
router.put('/enemies/edit', editEnemies);
router.delete('/enemies/remove', removeEnemies);
router.get('/enemies/get', getEnemies);

router.post('/npcs/add', addNpcs);
router.put('/npcs/edit', editNpcs);
router.delete('/npcs/remove', removeNpcs);
router.get('/npcs/get', getNpcs);

export default router;
