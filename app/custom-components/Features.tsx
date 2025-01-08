import { Card, CardContent } from "@/components/ui/card"
import { Upload, Search, Zap, Lock, Brain, History } from 'lucide-react'

const features = [
  {
    icon: <Brain className="h-6 w-6 md:text-primary text-white" />,
    title: "AI-Powered Understanding",
    description: "Advanced natural language processing for accurate and contextual responses."
  },
  {
    icon: <Upload className="h-6 w-6 text-purple-500" />,
    title: "Instant Processing",
    description: "Upload any PDF and start chatting immediately with zero setup time."
  },
  {
    icon: <Search className="h-6 w-6 text-pink-500" />,
    title: "Smart Search",
    description: "Find exactly what you need with intelligent semantic search capabilities."
  },
  {
    icon: <History className="h-6 w-6 text-primary" />,
    title: "Conversation History",
    description: "Keep track of all your document interactions in one organized place."
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    title: "Real-time Responses",
    description: "Get instant answers to your questions without any delay."
  },
  {
    icon: <Lock className="h-6 w-6 text-pink-500" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption and privacy protection for your documents."
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
          <p className="text-gray-400">
            Powerful features to help you understand and interact with your documents better.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black/50 border md:border-white/10 border-white/50  hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="p-2 rounded-lg bg-white/5 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

