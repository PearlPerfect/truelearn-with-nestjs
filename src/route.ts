import { RouterModule } from "@nestjs/core";
import authRoute from "./module/authentication/route/auth.route";
import contactRoute from "./module/contact/route/contact.route";
import { categoryRoute } from "./module/category/route/category.route";
import { courseRoute } from "./module/courses/route/course.route";

const routes = RouterModule.register([
    authRoute,
    categoryRoute,
    contactRoute,
    courseRoute  
  ]);
  
  export default routes;