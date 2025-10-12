import Togglable from "./Togglable"

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  // console.log('blog---', blog);

  // const handleLike =  async event => {
  //   event.preventDefault()
  //   console.log('liking this object', blog);
  //   const updatedBlog = ({
  //     ...blog,
  //     likes: blog.likes + 1,
  //     user: blog.user.id
  //   })

  //   console.log('new Blog', updatedBlog.id, updatedBlog);
  //   console.log('changed');

  // }


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <Togglable buttonLabelShow="view" buttonLabelCancel="hide">
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={ () => handleLike(blog)}>like</button></div>
          <div>{blog?.user?.name}</div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
