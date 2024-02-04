import BaseModel from "@/db/models/BaseModel"
import CommentModel from "@/db/models/CommentModel"
import UserModel from "@/db/models/UserModel"

class PostModel extends BaseModel {
  static tableName = "posts"
  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "posts.userId",
          to: "user.id",
        },
      },
      comment: {
        modelClass: CommentModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "posts.id",
          to: "comments.commentId",
        },
      },
    }
  }
}

export default PostModel
