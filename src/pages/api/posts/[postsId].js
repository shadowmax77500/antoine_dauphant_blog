import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  nameValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        postsId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postsId },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query()
        .findById(postsId)
        .withGraphFetched("comment")
        .throwIfNotFound()

      send(post)
    },
  ],
  PATCH: [
    validate({
      query: {
        postsId: idValidator.required(),
      },
      body: {
        title: nameValidator,
        content: descriptionValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { postsId },
        body,
      },
      models: { PostModel },
    }) => {
      const updatedPost = await PostModel.query()
        .updateAndFetchById(postsId, body)
        .withGraphFetched("comment")
        .throwIfNotFound()

      send(updatedPost)
    },
  ],
  DELETE: [
    validate({
      query: {
        postsId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postsId },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query().findById(postsId).throwIfNotFound()

      await post.$query().delete()

      send(post)
    },
  ],
})

export default handle
