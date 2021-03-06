const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email))
}

const validateUsername = username => {
  const re = /^[0-9A-Za-z_\-.]{3,20}$/
  return re.test(String(username))
}

const validateFirstName = name => {
  const re = /^[A-Za-z-]{3,20}$/
  return re.test(String(name))
}

const validateLastName = name => {
  const re = /^[A-Za-z\- ]{3,20}$/
  return re.test(String(name))
}

const validatePassword = password => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$/
  return re.test(String(password))
}

const validatePicture = picture => {
  return !!picture.size
}

const validateComment = comment => {
  if (comment.length > 1000 || comment.length === 0) { return false }
  return true
}

export { validateUsername, validateFirstName, validatePassword, validateLastName, validateEmail, validatePicture, validateComment }