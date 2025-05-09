"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Brain,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Calendar,
  User,
  Lock,
  Phone,
  Check,
  Search,
  UserPlus,
  Shield,
} from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [contacts, setContacts] = useState<{ name: string; tel?: string[] }[]>([])


    // 👇 Load contacts when step 3 is reached
    useEffect(() => {
      if (step === 3) loadContacts()
    }, [step])
  

  // Step 1: Basic Info
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Step 2: Phone Verification
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  // Step 3: First Connection
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null)

  // Final Step
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSendOtp = () => {
    if (!phone) return

    setIsLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleVerifyOtp = () => {
    if (!otp) return

    setIsLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      setStep(3)
    }, 1500)
  }

  const handleCompleteSignup = async () => {
    if (!termsAccepted) return
  
    setIsLoading(true)
  
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        throw new Error(data.error || "Signup failed")
      }
  
      localStorage.setItem("token", data.token)
      router.push("/")
    } catch (err: any) {
      alert(err.message || "Signup error")
    } finally {
      setIsLoading(false)
    }
  }
  
  
  const loadContacts = async () => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        const props = ["name", "tel"]
        const opts = { multiple: true }
  
        const selected = await (navigator as any).contacts.select(props, opts)
        setContacts(selected)
      } catch (err) {
        console.error("Contact permission denied or not supported")
      }
    } else {
      alert("Contact access is not supported on this device.")
    }
  }
  

  const filteredContacts = searchTerm
  ? contacts.filter((contact) =>
      contact.name[0].toLowerCase().includes(searchTerm.toLowerCase())
    )
  : contacts


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white flex flex-col">
      <SignupBackground />

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between">
        <Link href="/landing" className="inline-flex items-center gap-2 text-indigo-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-600/30 backdrop-blur-md flex items-center justify-center">
            <Brain className="h-4 w-4 text-indigo-300" />
          </div>
          <span className="text-sm font-light">Genesis</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl shadow-indigo-900/10">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              <StepIndicator number={1} title="Info" isActive={step >= 1} isCompleted={step > 1} />
              <div className="h-0.5 flex-1 bg-white/10 mx-2">
                <motion.div
                  className="h-full bg-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: step > 1 ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <StepIndicator number={2} title="Verify" isActive={step >= 2} isCompleted={step > 2} />
              <div className="h-0.5 flex-1 bg-white/10 mx-2">
                <motion.div
                  className="h-full bg-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: step > 2 ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <StepIndicator number={3} title="Connect" isActive={step >= 3} isCompleted={step > 3} />
              <div className="h-0.5 flex-1 bg-white/10 mx-2">
                <motion.div
                  className="h-full bg-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: step > 3 ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <StepIndicator number={4} title="Terms" isActive={step >= 4} isCompleted={step > 4} />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-light mb-6 text-center">Basic Information</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setStep(2)
                    }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm text-indigo-300 flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        <span>Full Name</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border-white/10 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-slate-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthday" className="text-sm text-indigo-300 flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Birthday</span>
                      </Label>
                      <Input
                        id="birthday"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="bg-white/5 border-white/10 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-slate-500"
                        placeholder="Select your birthday"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm text-indigo-300 flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        <span>Username</span>
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-white/5 border-white/10 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-slate-500"
                        placeholder="Choose a username"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm text-indigo-300 flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Password</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-white/5 border-white/10 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-slate-500 pr-10"
                          placeholder="Create a password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-6 mt-4 flex items-center justify-center gap-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-light mb-6 text-center">Phone Verification</h2>
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm text-indigo-300 flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5" />
                        <span>Phone Number</span>
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-white/5 border-white/10 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-slate-500"
                          placeholder="Enter your phone number"
                          required
                          disabled={otpSent}
                        />
                        {!otpSent && (
                          <Button
                            type="button"
                            onClick={handleSendOtp}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4"
                            disabled={!phone || isLoading}
                          >
                            {isLoading ? (
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              "Send"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    {otpSent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="otp" className="text-sm text-indigo-300">
                          Verification Code
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="bg-white/5 border-white/10 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-slate-500"
                            placeholder="Enter the 6-digit code"
                            maxLength={6}
                            required
                          />
                          <Button
                            type="button"
                            onClick={handleVerifyOtp}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4"
                            disabled={!otp || otp.length < 6 || isLoading}
                          >
                            {isLoading ? (
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-indigo-300 mt-1">
                          We sent a verification code to your phone number.
                        </p>
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-indigo-300 hover:text-white hover:bg-white/5"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-light mb-6 text-center">First Connection</h2>
                  <div className="space-y-5">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border-white/10 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder:text-slate-500 pl-10"
                        placeholder="Search for friends..."
                      />
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 max-h-60 overflow-y-auto">
                      {filteredFriends.length > 0 ? (
                        <div className="p-2 space-y-2">
                          {filteredFriends.map((friend) => (
                            <div
                              key={friend.id}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                selectedFriend === friend.id
                                  ? "bg-indigo-600/30 border border-indigo-500/50"
                                  : "hover:bg-white/5"
                              }`}
                              onClick={() => setSelectedFriend(friend.id)}
                            >
                              <div className="h-10 w-10 rounded-full bg-indigo-900/50 overflow-hidden">
                                <img
                                  src={friend.avatar || "/placeholder.svg"}
                                  alt={friend.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-white">{friend.name}</p>
                              </div>
                              {selectedFriend === friend.id && (
                                <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-slate-400">
                          <p>No results found</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-indigo-300 hover:text-white hover:bg-white/5"
                        onClick={() => setStep(2)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="border-white/10 text-white hover:bg-white/5"
                          onClick={() => setStep(4)}
                        >
                          Skip
                        </Button>
                        <Button
                          type="button"
                          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4"
                          onClick={() => setStep(4)}
                          disabled={!selectedFriend}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-light mb-6 text-center">Accept Terms</h2>
                  <div className="space-y-5">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-indigo-900/50 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-indigo-300" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">Terms & Privacy</h3>
                          <p className="text-xs text-slate-400">Please review our terms before continuing</p>
                        </div>
                      </div>
                      <div className="h-40 overflow-y-auto bg-black/20 rounded-lg p-3 text-xs text-slate-300 mb-4">
                        <p className="mb-2">
                          Welcome to Mirro. By using our service, you agree to these Terms of Service and our Privacy
                          Policy.
                        </p>
                        <p className="mb-2">
                          <strong>Privacy:</strong> We respect your privacy and are committed to protecting your
                          personal data. We collect only the information necessary to provide our services.
                        </p>
                        <p className="mb-2">
                          <strong>Content:</strong> You retain ownership of your content. By posting content, you grant
                          Genesis a non-exclusive license to use, display, and distribute your content.
                        </p>
                        <p className="mb-2">
                          <strong>Conduct:</strong> You agree not to use Genesis for any illegal or unauthorized
                          purpose. You will not violate any laws or regulations.
                        </p>
                        <p>
                          <strong>Termination:</strong> We reserve the right to terminate or suspend your account at our
                          sole discretion, without notice, for conduct that we believe violates these Terms or is
                          harmful to other users, us, or third parties.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={termsAccepted}
                          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                          className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                        />
                        <Label htmlFor="terms" className="text-sm text-slate-300">
                          I accept the{" "}
                          <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-indigo-300 hover:text-white hover:bg-white/5"
                        onClick={() => setStep(3)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-6 py-6"
                        onClick={handleCompleteSignup}
                        disabled={!termsAccepted || isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          "Complete Sign Up"
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

interface StepIndicatorProps {
  number: number
  title: string
  isActive: boolean
  isCompleted: boolean
}

function StepIndicator({ number, title, isActive, isCompleted }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
          isCompleted
            ? "bg-indigo-600 text-white"
            : isActive
              ? "bg-white/10 text-white border border-indigo-500"
              : "bg-white/5 text-slate-400 border border-white/10"
        }`}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : number}
      </div>
      <span className={`text-xs mt-1 ${isActive || isCompleted ? "text-indigo-300" : "text-slate-500"}`}>{title}</span>
    </div>
  )
}

function SignupBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-indigo-900/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-900/20 blur-3xl"></div>

      {/* Animated grid with curved lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 C 30 10, 10 10, 0 0" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="0.5" />
            <path d="M 0 40 C 10 30, 30 30, 40 40" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="0.5" />
            <path d="M 0 0 C 10 10, 10 30, 0 40" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="0.5" />
            <path d="M 40 40 C 30 30, 30 10, 40 0" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-indigo-400"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
