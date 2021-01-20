import * as React from 'react'
import { usePlugin } from 'tinacms'
import { useJsonForm } from 'next-tinacms-json'

export default function Page({ jsonFile }) {
  const [post, form] = useJsonForm(jsonFile)
  usePlugin(form)
  return (
    <>
      <h1>{post.title}</h1>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const content = await import(`../posts/test.json`)

  return {
    props: {
      jsonFile: {
        fileRelativePath: `/posts/test.json`,
        data: content.default,
      },
    },
  }
}

export async function getStaticPaths() {
  //get all .json files in the posts dir
  const glob = require('glob')
  const posts = glob.sync('posts/*.json')

  //remove path and extension to leave filename only
  const postSlugs = posts.map(file =>
    file
      .split('/')[1]
      .replace(/ /g, '-')
      .slice(0, -5)
      .trim()
  )
  console.log("", postSlugs)

  // create paths with `slug` param
  const paths = postSlugs.map(slug => `/test`)
  console.log("", paths)
  return {
    paths,
    fallback: true,
  }
}
