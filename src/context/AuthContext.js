import { createContext, useContext, useEffect, useState } from "react";
import {auth,db} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
const AuthContext = createContext()



export function AuthContextProvider({children}){
    const [user,setUser] = useState({})

    function signup(email,passowrd){
        createUserWithEmailAndPassword(auth, email,passowrd)
        setDoc(doc(db, 'users',email),{
            savedShows:[]
        })
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    function logout(){
    
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        })
        return ()=>{
            unsubscribe()
        }
    })
    
  return (
    <AuthContext.Provider value={{signup,login, logout,user}}>
        {children}
    </AuthContext.Provider>
  )
}

export function UserAuth(){
    return useContext(AuthContext)
}