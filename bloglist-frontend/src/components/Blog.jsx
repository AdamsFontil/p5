import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  // console.log('blog info i need user as well', blog);
  // console.log('who is user', user);
  const canDelete = user?.username === blog?.user?.username




  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
        { visible && (
          <div>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button onClick={ () => handleLike(blog)}>like</button></div>
            <div>{blog?.user?.name}</div>
            { canDelete && (
              <div><button onClick={ () => handleRemove(blog)}>remove</button></div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
