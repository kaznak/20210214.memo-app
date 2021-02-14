import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getMemos from "app/memos/queries/getMemos"

const ITEMS_PER_PAGE = 100

export const MemosList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ memos, hasMore }] = usePaginatedQuery(getMemos, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <table>
        <thead>
          <th>ID</th>
          <th>createdAt</th>
          <th>updatedAt</th>
          <th>text</th>
          <th>links</th>
        </thead>
        <tbody>
          {memos.map((memo) => (
            <Link key={memo.id} href={`/memos/${memo.id}`}>
              <tr key={memo.id}>
                <td>{memo.id}</td>
                <td>{memo.createdAt.toString()}</td>
                <td>{memo.updatedAt.toString()}</td>
                <td>{memo.text}</td>
                <td>{memo.links.map((link) => link.id).join(", ")}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const MemosPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/memos/new">
          <a>Create Memo</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <MemosList />
      </Suspense>
    </div>
  )
}

MemosPage.getLayout = (page) => <Layout title={"Memos"}>{page}</Layout>

export default MemosPage
