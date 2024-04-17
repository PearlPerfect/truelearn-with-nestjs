import { CourseModule } from "../modules/course.module";
import { EnrolledModule } from "../modules/enrollment.module";
import { MaterialModule } from "../modules/material.module";
import { TopicModule } from "../modules/topic.module";



export const courseRoute = {
    path: 'courses',
  module: CourseModule,
  children:[{
    path: '/',
    module: TopicModule
  
  },
  {
    path: 'topic',
    module:MaterialModule
  
  },
  {
    path: '/',
    module: EnrolledModule
  }
]

}

