import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog with author and title', () => {
  const blog = {
    title: 'vitetest Blog ',
    author: 'hellas',
    url: 'vitejs.com',
  }



  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    blog.title
  )
  expect(div).toHaveTextContent(
    blog.author
  )
  expect(div).not.toHaveTextContent(
    blog.url
  )
  screen.debug(div)
  expect(div).toBeDefined()
})
