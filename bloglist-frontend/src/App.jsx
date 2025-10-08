import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
    useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('log in saved---', user);
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('login success', user);
      setNotification({message: `Login succeeded ${user.username} is in`,})
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch(error) {
      console.log('login failed', error);
      console.log('login failed', error.response.data.error);
      console.log('login failed', typeof(error.response.data.error));
      setNotification({message: error.response.data.error, error: true})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    console.log('logging out', user);
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser', JSON.stringify(user))
    blogService.setToken(null)
    setUser(null)
    console.log('logged out complete');
  }

  const handleCreate = async event => {
  event.preventDefault();
  console.log('creating new blog');
  console.log('values are', author, url, title);

  const newBlog = {
    title,
    author,
    url
  };

  try {
    const createdBlog = await blogService.create(newBlog);
    console.log('Created blog:', createdBlog);
    setNotification({message:`a new blog ${createdBlog.title} by ${createdBlog.author} added`, })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  } catch (error) {
    console.error('Error creating blog:', error);
    setNotification({message: error, error:true})
        setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  setAuthor('');
  setUrl('');
  setTitle('');
};
const notificationComp = () => (
  notification.error ? (
    <div className='error'>
      {notification.message}
    </div>
  ) : (
    <div className='note'>
      {notification.message}
    </div>
  )
);


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification && notificationComp()}
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input type="text"
                value={username}
                onChange={ ({ target }) => setUsername(target.value)}
                 />
            </label>
            </div>
            <div>
            <label>
              password
              <input type="text"
                value={password}
                onChange={ ({ target }) => setPassword(target.value)} />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }



  return (
    <div>
      <h2>blogs</h2>
      {notification && notificationComp()}
      <p> {user.name} is logged in <button onClick={handleLogout}>logout</button></p>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title
            <input type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            author
            <input type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            url
            <input type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
