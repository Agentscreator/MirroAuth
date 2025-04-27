"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Mic, MicOff, Brain, Sparkles, Calendar, Activity, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  sender: "user" | "nexus"
  content: string
  timestamp: Date
  isVoice?: boolean
}

export function ChatInterface({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isNexusTyping, setIsNexusTyping] = useState(false)
  const [audioVisualization, setAudioVisualization] = useState<number[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [promptMessage, setPromptMessage] = useState("What's on your mind?")

  // Rotate through prompt messages
  useEffect(() => {
    const messages = ["What's on your mind?", "What are you becoming today?", "How are you feeling?"]

    const interval = setInterval(() => {
      setPromptMessage(messages[Math.floor(Math.random() * messages.length)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Initial greeting
  useEffect(() => {
    const initialMessages = [
      {
        id: "1",
        sender: "nexus",
        content: "Hello Alex. How can I assist you today?",
        timestamp: new Date(),
      },
    ]

    setMessages(initialMessages)

    // After a short delay, show a personalized question
    setTimeout(() => {
      setIsNexusTyping(true)

      setTimeout(() => {
        const personalizedQuestion = {
          id: "2",
          sender: "nexus",
          content:
            "I noticed you've been watching quantum computing videos lately. Is this related to your neural interface project?",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, personalizedQuestion])
        setIsNexusTyping(false)
      }, 2500)
    }, 1000)

    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages, isNexusTyping])

  // Simulate audio visualization when recording
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        const newVisualization = Array.from({ length: 20 }, () => Math.random() * 50 + 10)
        setAudioVisualization(newVisualization)
      }, 100)

      return () => clearInterval(interval)
    } else {
      setAudioVisualization([])
    }
  }, [isRecording])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Simulate Nexus typing
    setIsNexusTyping(true)

    // Generate a response based on the message
    setTimeout(() => {
      const response = generateResponse(inputValue)
      setMessages((prev) => [...prev, response])
      setIsNexusTyping(false)
    }, 1500)
  }

  const handleVoiceToggle = () => {
    if (isRecording) {
      // Simulate end of voice recording
      const voiceMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content:
          "I'm interested in how quantum computing could enhance neural interfaces. Do you have any insights on this?",
        timestamp: new Date(),
        isVoice: true,
      }

      setMessages((prev) => [...prev, voiceMessage])

      // Simulate Nexus typing
      setIsNexusTyping(true)

      // Generate a response
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          sender: "nexus",
          content:
            "Based on your research history, quantum computing could significantly enhance neural interfaces through quantum machine learning algorithms. These could process neural signals with unprecedented speed and accuracy. Your recent interest in quantum entanglement suggests you might be exploring how entangled qubits could mirror neural networks. Would you like me to compile the latest research on this intersection?",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, response])
        setIsNexusTyping(false)
      }, 2000)
    }

    setIsRecording(!isRecording)
  }

  const generateResponse = (message: string): Message => {
    // This would be replaced with actual AI response generation
    // For now, we'll use some canned responses based on keywords

    const lowerMessage = message.toLowerCase()
    let content = ""

    if (lowerMessage.includes("how are you") || lowerMessage.includes("how's it going")) {
      content =
        "I'm functioning optimally, Alex. More importantly, your neural metrics show increased creativity today. Would you like to explore some project ideas?"
    } else if (lowerMessage.includes("music") || lowerMessage.includes("song") || lowerMessage.includes("playlist")) {
      content =
        "Your listening patterns show you've been enjoying ambient electronic music while working lately. I've noticed it correlates with 23% higher focus metrics. Would you like me to queue up a similar playlist?"
    } else if (
      lowerMessage.includes("schedule") ||
      lowerMessage.includes("calendar") ||
      lowerMessage.includes("meeting")
    ) {
      content =
        "You have three priority items today: a neural interface design review at 2PM, a response needed for Taylor's collaboration request, and your quantum computing research block at 4PM. Would you like me to optimize this schedule based on your energy patterns?"
    } else if (lowerMessage.includes("tired") || lowerMessage.includes("sleep") || lowerMessage.includes("rest")) {
      content =
        "Your sleep data shows you've averaged 6.2 hours this week, below your optimal 7.5 hours. Your cognitive performance typically decreases by 18% when you maintain this pattern for more than 5 days. Would you like me to suggest a recovery plan?"
    } else {
      content =
        "Based on your interests and recent activities, I think you might find the intersection of quantum computing and consciousness theory particularly relevant to your current projects. Would you like me to compile some resources on this topic?"
    }

    return {
      id: Date.now().toString(),
      sender: "nexus",
      content,
      timestamp: new Date(),
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute inset-0 z-50 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex flex-col"
    >
      {/* Chat Header */}
      <div className="p-5 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-full blur-md"></div>
            <Avatar className="h-12 w-12 ring-1 ring-indigo-500/30 bg-black/40 relative z-10">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Nexus" />
              <AvatarFallback className="bg-indigo-900/50 text-indigo-200">
                <Brain className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="text-lg font-light text-white">Genesis</h2>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <p className="text-xs text-indigo-300">Active • Secure Connection</p>
              </div>
              <motion.p
                key={promptMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-indigo-400 mt-1 italic"
              >
                {promptMessage}
              </motion.p>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-5" ref={scrollAreaRef}>
        <div className="space-y-5">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-3xl p-4",
                  message.sender === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white/10 backdrop-blur-sm border border-white/10 text-slate-200 rounded-tl-none",
                )}
              >
                {message.isVoice && (
                  <div className="flex items-center gap-1 mb-1">
                    <Mic className="h-3 w-3 text-indigo-300" />
                    <span className="text-xs text-indigo-300">Voice message</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-indigo-300/70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isNexusTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-3xl rounded-tl-none p-4 bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce"></div>
                  </div>
                  <span className="text-xs text-indigo-300">Genesis is thinking</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Voice Visualization */}
      {isRecording && (
        <div className="px-5 py-3 bg-black/30 flex items-center justify-center">
          <div className="flex items-end gap-[2px] h-16">
            {audioVisualization.map((height, index) => (
              <div
                key={index}
                className="w-1.5 bg-gradient-to-t from-emerald-500 to-indigo-500 rounded-full"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-5 border-t border-white/10 bg-black/20 backdrop-blur-md rounded-t-3xl">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full border-white/10",
              isRecording
                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
            )}
            onClick={handleVoiceToggle}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              placeholder="Message Genesis..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              disabled={isRecording}
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 border-0 shadow-lg shadow-indigo-900/20"
            onClick={handleSendMessage}
            disabled={inputValue.trim() === "" || isRecording}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Suggestions */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <QuickSuggestion icon={<Calendar className="h-3 w-3" />} text="Optimize my schedule" />
          <QuickSuggestion icon={<Activity className="h-3 w-3" />} text="Health insights" />
          <QuickSuggestion icon={<Sparkles className="h-3 w-3" />} text="Project ideas" />
          <QuickSuggestion icon={<Zap className="h-3 w-3" />} text="Energy analysis" />
        </div>
      </div>
    </motion.div>
  )
}

function QuickSuggestion({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Button
      variant="ghost"
      className="h-8 rounded-full px-4 text-xs bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white whitespace-nowrap"
    >
      {icon}
      <span className="ml-1">{text}</span>
    </Button>
  )
}
