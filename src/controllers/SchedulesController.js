// import ServiceModel from '../models/ServiceModel';
// import UsersController from '../../controllers/UsersController';

class SchedulesController {

    availableTimes = [
    
        { serviceId: 1, date: '2023-08-07', hour: '10:00', available: true },
        { serviceId: 1, date: '2023-08-07', hour: '12:00', available: false },
        { serviceId: 1, date: '2023-08-07', hour: '14:00', available: true },
        { serviceId: 1, date: '2023-08-07', hour: '15:00', available: false },
    
        { serviceId: 1, date: '2023-08-09', hour: '10:00', available: true },
        { serviceId: 1, date: '2023-08-09', hour: '13:00', available: true },
    
        { serviceId: 1, date: '2023-08-10', hour: '14:00', available: true },
        { serviceId: 1, date: '2023-08-10', hour: '16:00', available: false },
    
        { serviceId: 1, date: '2023-08-11', hour: '10:00', available: true },
        { serviceId: 1, date: '2023-08-12', hour: '10:00', available: false },
        { serviceId: 1, date: '2023-08-13', hour: '10:00', available: false },
    ];
}

export default new SchedulesController();