import express from 'express';
import { celebrate, Joi } from 'celebrate';

import AuthController from './controllers/AuthController';
import CustomerController from './controllers/CustomerController';
import SchedulingController from './controllers/SchedulingController';
import ServiceTypeController from './controllers/ServiceTypeController';
import BlockedDatesController from './controllers/BlockedDatesController';

const routes = express.Router();

const authController = new AuthController();
const customerController = new CustomerController();
const schedulingController = new SchedulingController();
const serviceTypeController = new ServiceTypeController();
const blockedDatesController = new BlockedDatesController();

routes.get('/', (request, response) => {
  return response.end('schedule-man server is working...');
});

routes.post('/auth/register', authController.register);
routes.post('/auth/login', authController.authenticate);

routes.get('/customers', customerController.index);
routes.get('/customers/:id', customerController.show);
routes.post('/customers', customerController.create);
routes.put('/customers/:id', customerController.update);
routes.delete('/customers/:id', customerController.remove);

routes.get('/scheduling', schedulingController.index);

routes.get('/service-types', serviceTypeController.index);
routes.get('/service-types/:id', serviceTypeController.show);
routes.post('/service-types', serviceTypeController.create);
routes.put('/service-types/:id', serviceTypeController.update);
routes.delete('/service-types/:id', serviceTypeController.remove);

routes.get('/blocked-dates', blockedDatesController.index);
routes.get('/blocked-dates/:id', blockedDatesController.show);
routes.post('/blocked-dates', blockedDatesController.create);
routes.put('/blocked-dates/:id', blockedDatesController.update);
routes.delete('/blocked-dates/:id', blockedDatesController.remove);

export default routes;