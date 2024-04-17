import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";
import { AuthDocument } from "src/module/authentication/model/auth.model";
import { CourseDocument } from "src/module/courses/models/course.model";


export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema()
export class Favorite {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Auth', required: true })
    userId: string | AuthDocument

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Course', required: true })
    courseId: string | CourseDocument
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
