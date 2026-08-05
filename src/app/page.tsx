/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Code2, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import ArchitectureExplorer from "@/components/ArchitectureExplorer";
import TextareaAutosize from "react-textarea-autosize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { portfolioData } from "@/data/knowledgeBase";

export default function Home() {
  const chat: any = useChat();
  const { messages, isLoading, sendMessage, append: chatAppend } = chat;
  const [input, setInput] = useState("");
  const [activeView, setActiveView] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleInputChange = (e: any) => setInput(e.target.value);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = { role: "user", content: input };
    if (sendMessage) sendMessage(msg);
    else if (chatAppend) chatAppend(msg);
    setInput("");
  };

  const append = (msg: { role: string, content: string }) => {
    if (sendMessage) sendMessage(msg);
    else if (chatAppend) chatAppend(msg);
  };
  
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const lastMsg: any = messages[messages.length - 1];
    const toolParts = lastMsg.toolInvocations || lastMsg.parts?.filter((p: any) => p.type?.startsWith('tool-') || p.type === 'dynamic-tool' || p.type === 'tool-invocation') || [];
    if (toolParts.length > 0) {
      const lastTool = toolParts[toolParts.length - 1];
      const toolName = lastTool.toolName || lastTool.type?.replace('tool-', '');
      setTimeout(() => {
        if (toolName === "showResume") setActiveView("resume");
        else if (toolName === "showProjects") setActiveView("projects");
        else if (toolName === "explainProjectArchitecture") setActiveView(lastTool.toolCallId);
      }, 0);
    }
  }, [messages]);
  
  const suggestedPrompts = [
    "Tell me about yourself",
    "Explain your backend experience",
    "Show my best project",
    "Explain your architecture",
    "Show my resume",
    "Explain FleetLink"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Chat Interface */}
      <div className="w-full max-w-4xl flex flex-col h-[90vh] z-10">
        
        {/* Header / Empty State */}
        {(!messages || messages.length === 0) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Hi, I&apos;m <span className="text-primary">Shubham.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light">
              You don&apos;t have to scroll through a portfolio. <br />
              <span className="text-foreground">Just ask me anything.</span>
            </p>
          </motion.div>
        )}

        {/* Chat Messages */}
        {messages && messages.length > 0 && (
          <div className="flex-1 overflow-y-auto w-full space-y-6 pb-6 scrollbar-hide px-4">
            <AnimatePresence>
              {messages && messages.map((m: any) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-5 ${
                      m.role === "user" 
                        ? "bg-primary text-primary-foreground ml-4" 
                        : "bg-card border border-border/50 text-card-foreground shadow-lg backdrop-blur-md mr-4"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2 opacity-70">
                      {m.role === "user" ? <User size={16} /> : <Sparkles size={16} className="text-primary" />}
                      <span className="text-xs uppercase tracking-wider font-semibold">
                        {m.role === "user" ? "You" : "Shubham AI"}
                      </span>
                    </div>
                    
                    {(() => {
                      const textContent = m.content || (m.parts?.filter((p: any) => p.type === 'text') || []).map((p: any) => p.text).join("");
                      const tools = m.toolInvocations || m.parts?.filter((p: any) => p.type?.startsWith('tool-') || p.type === 'dynamic-tool' || p.type === 'tool-invocation') || [];
                      
                      return (
                        <>
                          <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-transparent prose-pre:border-0 max-w-none">
                            {textContent && (
                              <ReactMarkdown
                                components={{
                                  code: ({ node, inline, className, children, ...props }: any) => {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return !inline && match ? (
                                      <SyntaxHighlighter
                                        style={atomDark as any}
                                        language={match[1]}
                                        PreTag="div"
                                        className="rounded-xl !my-4 border border-border/50 text-sm shadow-xl"
                                        {...props}
                                      >
                                        {String(children).replace(/\n$/, "")}
                                      </SyntaxHighlighter>
                                    ) : (
                                      <code className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm" {...props}>
                                        {children}
                                      </code>
                                    );
                                  }
                                }}
                              >
                                {textContent}
                              </ReactMarkdown>
                            )}
                          </div>
      
                          {tools && tools.length > 0 && (
                            <div className="mt-4 space-y-4">
                              {tools.map((tool: any) => {
                                const toolCallId = tool.toolCallId;
                                const action = tool.toolName || tool.type?.replace('tool-', '');
                          
                          if (action === "showResume") {
                            return (
                              <div key={toolCallId} className="bg-background/50 border border-border/30 rounded-xl p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                                  <Sparkles size={16} className="text-secondary" />
                                  Interactive Resume
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">View Shubham&apos;s complete professional experience.</p>
                                <button onClick={() => setActiveView("resume")} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm transition-all hover:opacity-90">
                                  Open Resume
                                </button>
                              </div>
                            );
                          }

                          if (action === "showProjects") {
                            return (
                              <div key={toolCallId} className="bg-background/50 border border-border/30 rounded-xl p-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                                  <Code2 size={16} className="text-primary" />
                                  Projects Workspace
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">Explore featured projects and technical deep-dives.</p>
                                <button onClick={() => setActiveView("projects")} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-all hover:opacity-90">
                                  View Projects
                                </button>
                              </div>
                            );
                          }

                          if (action === "explainProjectArchitecture") {
                            return (
                              <div key={toolCallId} className="w-full mt-4">
                                <ArchitectureExplorer />
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    )}
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start px-4"
              >
                <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-lg backdrop-blur-md flex items-center gap-3">
                  <Sparkles size={16} className="text-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground animate-pulse">Shubham AI is thinking...</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Area */}
        <div className="w-full mt-auto pt-6 space-y-4">
          {/* Suggested Prompts */}
          {(!messages || messages.length === 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => append({ role: 'user', content: prompt })}
                  className="px-4 py-2 rounded-full border border-border/50 bg-card/30 hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-all duration-300 text-sm backdrop-blur-sm text-muted-foreground"
                >
                  {prompt}
                </button>
              ))}
            </motion.div>
          )}

          {/* Chat Input */}
          <form 
            onSubmit={handleSubmit}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative flex items-center bg-card border border-border/50 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
              <div className="pl-4 pr-2 text-muted-foreground flex items-center h-full pt-1">
                <Terminal size={20} />
              </div>
              <TextareaAutosize
                className="flex-1 bg-transparent border-none outline-none p-3 text-lg placeholder:text-muted-foreground/50 focus:ring-0 resize-none max-h-[200px] scrollbar-hide"
                value={input || ""}
                placeholder="Ask Shubham AI anything..."
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !(input || "").trim()}
                className="p-3 bg-primary text-primary-foreground rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 font-medium"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
          <div className="text-center text-xs text-muted-foreground/50 pb-2">
            AI-powered digital twin. Responses are generated based on actual portfolio data.
          </div>
        </div>

      </div>

      {/* Sliding Overlays */}
      <AnimatePresence>
        {activeView === "resume" && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-card border-l border-border/50 shadow-2xl z-50 p-8 overflow-y-auto"
          >
            <button onClick={() => setActiveView(null)} className="absolute top-6 right-6 p-2 bg-muted rounded-full hover:bg-muted/80">
              X
            </button>
            <h2 className="text-3xl font-bold mb-8">Resume</h2>
            <div className="space-y-6">
              {portfolioData.experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/30 bg-background/50">
                  <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
                  <p className="text-muted-foreground">{exp.company} • {exp.duration}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-background/50 rounded text-xs font-medium border border-border/30">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === "projects" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-50 p-4 md:p-12 overflow-y-auto"
          >
            <div className="max-w-6xl mx-auto relative">
              <button onClick={() => setActiveView(null)} className="absolute top-0 right-0 p-2 bg-muted rounded-full hover:bg-muted/80 z-10">
                X
              </button>
              <h2 className="text-4xl font-bold mb-2">Projects Workspace</h2>
              <p className="text-muted-foreground mb-12">Interactive case studies of my best work.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioData.projects.map((proj, idx) => (
                  <div key={proj.id} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 hover:bg-card transition-colors flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-br ${idx % 2 === 0 ? 'from-primary/10' : 'from-secondary/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <h3 className={`text-2xl font-bold mb-2 ${idx % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>{proj.name}</h3>
                    <p className="text-muted-foreground mb-6 text-sm">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.technologies.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-background rounded text-xs font-medium border border-border/30">{tech}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 flex gap-4">
                      {idx === 0 ? (
                        <button onClick={() => setActiveView("architecture")} className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg text-sm font-medium w-full hover:bg-primary hover:text-primary-foreground transition-colors">
                          View Architecture
                        </button>
                      ) : (
                        <a href={proj.github} target="_blank" rel="noreferrer" className={`block w-full text-center px-4 py-2 ${idx % 2 === 0 ? 'bg-primary/20 text-primary border-primary/50 hover:bg-primary hover:text-primary-foreground' : 'bg-secondary/20 text-secondary border-secondary/50 hover:bg-secondary hover:text-secondary-foreground'} border rounded-lg text-sm font-medium transition-colors`}>
                          GitHub Repo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Info Cards (Desktop) */}
      <div className="hidden lg:block absolute left-8 top-1/4 space-y-6">
        <FloatingCard delay={0.1} title="Current Role" value={portfolioData.personalInfo.role} icon={<Code2 size={16}/>} />
        <FloatingCard delay={0.3} title="Experience" value="2+ Years" />
      </div>
      
      <div className="hidden lg:block absolute right-8 top-1/3 space-y-6">
        <FloatingCard delay={0.2} title="Tech Stack" value="Node.js, React, AWS" />
        <FloatingCard delay={0.4} title="Status" value={portfolioData.personalInfo.availability} />
      </div>
    </main>
  );
}

function FloatingCard({ title, value, icon, delay = 0 }: { title: string, value: string, icon?: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: title.includes("Role") || title.includes("Exp") ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="bg-card/50 border border-border/30 p-4 rounded-xl backdrop-blur-md shadow-xl w-64 transform hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center gap-2">
        {icon}
        {title}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </motion.div>
  );
}
