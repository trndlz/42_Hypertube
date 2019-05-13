const auth = {
  isAuthenticated: false,
  async authenticate () {
    // const controller = new AbortController();
    // const signal = controller.signal;
    const token = localStorage.getItem('jwt')
    let res = await fetch('http://localhost:8145/auth/isauthenticated', { //! THIS IS NOT ABORTED
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      // signal: signal
    })
    res = await res.json()
    this.isAuthenticated = res.isAuthenticated;
    // return controller;
  },
  async signout (cb) {
    this.isAuthenticated = false
    localStorage.removeItem('jwt')
    setTimeout(cb, 100)
  }
}

export { auth }
