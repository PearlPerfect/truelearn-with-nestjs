import { RouterModule } from "@nestjs/core";
import authRoute from "./module/Authentication/route/auth.route";
import contactRoute from "./module/contact/route/contact.route";

const routes = RouterModule.register([
    authRoute,
    contactRoute,
    
  ]);
  
  export default routes;