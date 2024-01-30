export { default } from "containers/GenreContainer"

export const getServerSideProps = async context => ({
  props: {
    id: context.params.id,
    page: context.query.page ? context.query.page : 1,
  },
})
