import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  pageValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        content: descriptionValidator.required(),
        userId: idValidator.required(),
        postId: idValidator.required(),
      },
    }),
    async ({ send, input: { body }, models: { CommentModel } }) => {
      const newPost = await CommentModel.query().insertAndFetch(body)

      send(newPost)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { page },
      },
      models: { CommentModel },
    }) => {
      const query = CommentModel.query()
      const comment = await query.clone().page(page)
      const [{ count }] = await query.clone().count()

      send(comment, { count })
    },
  ],
})

export default handle
