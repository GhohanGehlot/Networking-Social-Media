import express from 'express';
import { createGroup, DeleteGroup, joinGroup, leaveGroup, MyGroup, SearchGroup, ViewGroup } from '../controllers/group.controller.js';
import { hostVerification } from '../middlewares/host.middleware.js';
import { authorisedUser } from '../middlewares/auth.middleware.js';

const groupRoute = express.Router();

//POST request

groupRoute.post('/group/create', authorisedUser, createGroup );
groupRoute.post('/group/:id/join' , authorisedUser , joinGroup);
groupRoute.post('/group/:id/leave' , authorisedUser , leaveGroup);


//GET request
groupRoute.get('/group/search' , authorisedUser , SearchGroup);
groupRoute.get('/group/my-groups' , authorisedUser , MyGroup);
groupRoute.get('/group/:id' , authorisedUser , ViewGroup);



//DELETE only by Host

groupRoute.delete('/group/:id' , authorisedUser, hostVerification , DeleteGroup);



export default groupRoute;