import { CategoryDocument } from "src/module/category/models/category.model"
import { CourseDocument } from "src/module/courses/models/course.model";

export class AllCategoriesResponse{
    category:string
}

export class AllCoursesResponse{
    id:string
    category:string| CategoryDocument;
    course: String;
    description: string
}

export class AllCourseTopicResponse{
    id:string
    course: string | CourseDocument;
    topic: string
    description:string
}

export class AllTopicMaterialsResponse{
    id:string
    course: string | CourseDocument;
    topic: string
    nameOfMaterial:string
    description: string
    url: string
}

export class AllEnrolledResponse{
    userId: string
    course: string | CourseDocument
}