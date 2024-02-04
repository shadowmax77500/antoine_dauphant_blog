import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  descriptionValidator,
  idValidator,
  nameValidator,
  pageValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        title: nameValidator.required(),
        content: descriptionValidator.required(),
        userId: idValidator.required(),
      },
    }),
    async ({ send, input: { body }, models: { PostModel } }) => {
      const newPost = await PostModel.query().insertAndFetch(body)

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
      models: { PostModel },
    }) => {
      const query = PostModel.query()
      const products = await query
        .clone()
        .withGraphFetched("category")
        .page(page)
      const [{ count }] = await query.clone().count()

      send(products, { count })
    },
  ],
})

export default handle
