import React from 'react'
import axios from 'axios'

function Signup() {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:4001/user/register', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setSuccess(response.data.message || 'Account created successfully!')
      setFormData({ username: '', email: '', password: '' })
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-purple-950">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>
        
        {/* Large Planet - Cyan */}
        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-40 h-40 sm:w-52 sm:h-52 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-80 blur-sm"></div>
        
        {/* Medium Planet - Purple */}
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-70 blur-sm"></div>
        
        {/* Small Planet - Purple-Pink */}
        <div className="absolute top-1/3 right-5 sm:right-10 lg:right-20 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-purple-300 to-pink-400 opacity-60 blur-sm"></div>
        
        {/* Shooting Stars */}
        <div className="absolute top-1/4 right-1/4 w-1 h-12 sm:h-16 lg:h-20 bg-gradient-to-b from-white to-transparent rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-10 sm:h-12 lg:h-16 bg-gradient-to-b from-white to-transparent rotate-45 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Title Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 tracking-tight">
            JOIN US TODAY! ✨
          </h1>
          <p className="text-white text-sm sm:text-base opacity-80">Create your account and get started</p>
        </div>

        {/* Glass Morphism Card */}
        <div className="bg-purple-900 bg-opacity-40 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-purple-500 border-opacity-30">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Username Field */}
            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-purple-800 bg-opacity-50 border border-purple-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white text-sm sm:text-base font-medium placeholder-gray-300"
                placeholder="👤 Choose a username"
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-purple-800 bg-opacity-50 border border-purple-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white text-sm sm:text-base font-medium placeholder-gray-300"
                placeholder="📧 Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 rounded-xl sm:rounded-2xl bg-purple-800 bg-opacity-50 border border-purple-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white text-sm sm:text-base font-medium placeholder-gray-300"
                placeholder="🔒 Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-cyan-400 focus:outline-none transition-colors duration-200"
              >
                {showPassword ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500 bg-opacity-90 border-l-4 border-red-700 p-3 sm:p-4 rounded-xl">
                <p className="text-white text-sm sm:text-base font-semibold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500 bg-opacity-90 border-l-4 border-green-700 p-3 sm:p-4 rounded-xl">
                <p className="text-white text-sm sm:text-base font-semibold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {success}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold rounded-xl sm:rounded-2xl hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base sm:text-lg"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                '�� Sign up'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-white text-sm sm:text-base font-medium opacity-80">
              Already have an account?{' '}
              <a href="/login" className="text-cyan-400 font-bold hover:text-cyan-300 underline decoration-2 underline-offset-4 transition-colors duration-200">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
            START YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">ADVENTURE!</span>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Signup
