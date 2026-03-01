import React from 'react'
import { useNavigate } from "react-router-dom"


const Login = () => {
  
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = JSON.stringify({ email, password })
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"

        },
        body: data,
        credentials: "include"
      })
      const result = await res.json()
      if(res.ok) navigate('/post')
      else alert(result.message)
      console.log(result)
    }
    catch (err) {
      console.log("Error in onSubmitHandler", err);
    }
  }



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 px-4 py-10">

  <div className="
      w-full 
      max-w-sm                 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 
      rounded-3xl 
      p-6 
      shadow-2xl 
      animate-fadeIn
  ">
    
    <h1 className="text-white text-3xl font-bold text-center mb-8">
      Login
    </h1>

    <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 
                   focus:ring-2 focus:ring-white/60 focus:outline-none"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 
                   focus:ring-2 focus:ring-white/60 focus:outline-none"
      />

      <button
        className="p-3 bg-black/80 text-blue-400 rounded-xl 
                   hover:bg-black transition">
        Login
      </button>

    </form>

    <p className="text-center text-white/80 mt-6">
      Don’t have an account?{" "}
      <a href="/register" className="text-white font-semibold underline">
        Register
      </a>
    </p>

  </div>
</div>

  )
}

export default Login
