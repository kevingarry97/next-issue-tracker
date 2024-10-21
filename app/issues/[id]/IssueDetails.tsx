import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
      <Heading mb={'3'}>{issue.title}</Heading>
        <Flex gapX={'5'}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt={'4'}>
          <ReactMarkdown className='prose'>{issue.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default IssueDetails
