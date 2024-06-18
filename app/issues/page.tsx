import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const IssuesPage = () => {
  return (
    <div>
      <p>Issues</p>
      <Button>
        <Link href={'/issues/new'}> New Issue</Link>
      </Button>
    </div>
  )
}

export default IssuesPage
