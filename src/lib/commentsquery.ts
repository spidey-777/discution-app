import { cache } from "react";
import { prisma } from "."
import {Comment} from "@prisma/client";
 export type CommentWithUser = Comment & {
    user: {
        name: string | null;
        image: string | null;
    }
  
};

export const fetchCommentsByPostId = cache((postId:string): Promise<CommentWithUser[]>=>{
    // console.log("**************************");

    return  prisma.comment.findMany({
        where:{
            postId:postId
        },
        include:{
            user: {
                select: {
                    name: true,
                    image: true
                }  
            }
        }
    })


}
)