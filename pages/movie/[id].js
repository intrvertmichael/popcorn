export { default } from "containers/MovieContainer"

export const getStaticPaths = async () => ({ paths: [], fallback: true })

export const getStaticProps = async context => ({
  props: {
    id: context.params.id,
    fallback: false,
  },
})
