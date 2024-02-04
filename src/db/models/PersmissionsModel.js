// eslint-disable-next-line max-classes-per-file
import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"

class PermissionModel extends BaseModel {
  static tableName = "permissions"
  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "permissions.id",
          to: "users.permissionId",
        },
      },
    }
  }
}

export default PermissionModel
