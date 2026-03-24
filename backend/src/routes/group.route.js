import express from 'express';
import { createGroup, DeleteGroup, joinGroup, leaveGroup, MyGroup, searchGroup, ViewGroup } from '../controllers/group.controller.js';
import { hostVerification } from '../middlewares/host.middleware.js';
import { authorisedUser } from '../middlewares/auth.middleware.js';

const groupRoute = express.Router();

//POST request

groupRoute.post('/create', authorisedUser, createGroup );
groupRoute.post('/:id/join' , authorisedUser , joinGroup);
groupRoute.post('/:id/leave' , authorisedUser , leaveGroup);


//GET request
groupRoute.get('/search' , authorisedUser , searchGroup);
groupRoute.get('/my-groups' , authorisedUser , MyGroup);
groupRoute.get('/:id' , authorisedUser , ViewGroup);



//DELETE only by Host

groupRoute.delete('/:id' , authorisedUser, hostVerification , DeleteGroup);



export default groupRoute;