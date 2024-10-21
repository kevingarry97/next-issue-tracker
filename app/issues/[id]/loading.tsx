import { Box, Card, Flex } from '@radix-ui/themes'

import { Skeleton } from '../../components'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gapX={'5'}>
        <Skeleton width={'5rem'} />
        <Skeleton width={'8rem'} />
      </Flex>
      <Card mt={'4'}>
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage
