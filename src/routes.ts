import { Router } from 'express';
import Usercontroller from './controller/usercontroller/Usercontroller';
import { auth } from './middlewares/auth';
import { authadmin } from './middlewares/authdmin';
import Productcontroller from './controller/productcontroller/Productcontroller';
import UserAdmincontroller from './controller/UserAdmincontroller';
import Cardcontroller from './controller/cardcontroller/cardcontroller';
import ProductcontrollerFind from './controller/productcontroller/FindProductcontroller';

const routes = Router();
// rotas gerais acessadas sem token


routes.post('/login/', Usercontroller.getLogin);


routes.post('/register/', Usercontroller.Register)
routes.post('/loginadmin', UserAdmincontroller.getLoginAdmin);
//routes.put('/updatesenha/:id', UpdatePassWordHash)
//routes.get('/validarhash/:hash', getRecoverPassword)
//routes.post('/recuperarsenha/', createdRecoverPassword)
routes.get('/produtos/', Productcontroller.getProducts)
routes.get('/produtos/:id', ProductcontrollerFind.getProductID)

routes.get('/carrinho/:id', Cardcontroller.getCard)

// rotas acessadas com token adm
routes.post('/criaruseradmin/', authadmin, UserAdmincontroller.saveUserAdmin)





// var imageAsBase64 = fs.readFileSync(`./documents/${request.body.url}`, 'base64');
// return response.json({ url: `${baseformat}${imageAsBase64}` })
routes.use(auth)



export default routes;
