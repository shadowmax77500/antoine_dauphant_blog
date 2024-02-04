import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { descriptionValidator, idValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        commentsId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentsId },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query()
        .findById(commentsId)
        .withGraphFetched("comment")
        .throwIfNotFound()

      send(comment)
    },
  ],
  PATCH: [
    validate({
      query: {
        commentsId: idValidator.required(),
      },
      body: {
        content: descriptionValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { commentsId },
        body,
      },
      models: { CommentModel },
    }) => {
      const updatedComment = await CommentModel.query()
        .updateAndFetchById(commentsId, body)
        .withGraphFetched("comment")
        .throwIfNotFound()

      send(updatedComment)
    },
  ],
  DELETE: [
    validate({
      query: {
        commentsId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentsId },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query()
        .findById(commentsId)
        .throwIfNotFound()

      await comment.$query().delete()

      send(comment)
    },
  ],
})

export default handle
