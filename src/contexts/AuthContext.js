import React, { useContext, useState, useEffect } from "react"
import { auth,firebasedb } from "../firebase"

const AuthContext = React.createContext()
const db = firebasedb.ref("/")

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  
  function  getAlldata(childval) {
    return db.child(childval);
  }

  function createdata(childval,createvalue) {
    return db.child(childval).push(createvalue);
  }

  function updatedata(key, value) {
    return db.child(key).update(value);
  }

  function deletedata(key,value) {
    return db.child(key).child(value).remove();
  }

  function deleteAlldata() {
    return db.remove();
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getAlldata,
    createdata,
    updatedata,
    deletedata,
    deleteAlldata
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
