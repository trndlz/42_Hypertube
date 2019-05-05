const auth = {
  isAuthenticated: false,
  async authenticate () {
    const token = localStorage.getItem('jwt')
    let res = await fetch('http://localhost:8145/auth/isauthenticated', { //! THIS IS NOT ABORTED
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    })
    res = await res.json()
    this.isAuthenticated = res.isAuthenticated
  },
  async signout (cb) {
    this.isAuthenticated = false
    localStorage.removeItem('jwt')
    setTimeout(cb, 100)
  }
}

export { auth }
