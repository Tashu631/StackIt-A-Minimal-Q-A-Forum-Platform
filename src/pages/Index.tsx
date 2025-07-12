
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Bell, Plus, MessageSquare, ThumbsUp, User, Clock, Award, Eye, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { mockQuestions } from "@/data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  const allTags = [
    "React", "TypeScript", "JavaScript", "Node.js", "Python", 
    "GraphQL", "REST", "Docker", "AWS", "MongoDB", 
    "PostgreSQL", "Authentication", "Security", "Performance",
    "Testing", "DevOps", "API Design", "State Management"
  ];
  
  const filteredQuestions = mockQuestions.filter(question => 
    (question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedTags.length === 0 || question.tags.some(tag => selectedTags.includes(tag)))
  );

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes;
      case "answers":
        return b.answers - a.answers;
      case "views":
        return b.views - a.views;
      case "unanswered":
        return a.answers - b.answers;
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-blue-600">StackIt</h1>
              </Link>
              <p className="text-gray-500 hidden sm:block">Knowledge sharing community</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  12
                </span>
              </div>
              <Link to="/ask">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Alex Kumar</p>
                  <p className="text-xs text-gray-500">12,340 reputation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-yellow-500" />
                  Popular Tags
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 12).map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-blue-100 transition-colors text-xs"
                      onClick={() => {
                        setSelectedTags(prev => 
                          prev.includes(tag) 
                            ? prev.filter(t => t !== tag)
                            : [...prev, tag]
                        );
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Community Stats</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Questions
                  </span>
                  <span className="font-semibold text-blue-600">47,284</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Answers
                  </span>
                  <span className="font-semibold text-green-600">89,156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Users
                  </span>
                  <span className="font-semibold text-purple-600">12,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Views today
                  </span>
                  <span className="font-semibold text-orange-600">1,234k</span>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                  Featured Bounties
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-1">JWT Authentication Best Practices</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">+150 bounty</span>
                    <Badge variant="outline" className="text-xs">3h left</Badge>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-1">React Performance Optimization</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">+75 bounty</span>
                    <Badge variant="outline" className="text-xs">1d left</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search questions, tags, or users..."
                className="pl-10 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Questions ({sortedQuestions.length})
              </h2>
              <div className="flex space-x-2">
                {[
                  { key: "newest", label: "Newest" },
                  { key: "votes", label: "Most Voted" },
                  { key: "answers", label: "Most Answers" },
                  { key: "unanswered", label: "Unanswered" }
                ].map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={sortBy === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(key)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {sortedQuestions.map(question => (
                <Card key={question.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Vote & Answer Count */}
                      <div className="flex flex-col items-center space-y-3 text-gray-500 min-w-[80px]">
                        <div className="flex flex-col items-center">
                          <div className={`flex flex-col items-center ${question.votes > 20 ? 'text-green-600' : ''}`}>
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm font-semibold mt-1">{question.votes}</span>
                          </div>
                          <div className="text-xs mt-1">votes</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className={`flex flex-col items-center ${question.isAnswered ? 'text-green-600' : question.answers > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm font-semibold mt-1">{question.answers}</span>
                          </div>
                          <div className="text-xs mt-1">
                            {question.isAnswered ? 'solved' : 'answers'}
                          </div>
                        </div>

                        <div className="flex flex-col items-center text-gray-400">
                          <Eye className="w-4 h-4" />
                          <span className="text-xs mt-1">{question.views.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <Link to={`/question/${question.id}`} className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 mb-2 group-hover:underline">
                              {question.title}
                            </h3>
                          </Link>
                          {question.bounty && (
                            <Badge className="bg-yellow-100 text-yellow-800 ml-4 flex items-center">
                              <Zap className="w-3 h-3 mr-1" />
                              +{question.bounty}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {question.description.slice(0, 200)}...
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {question.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs hover:bg-blue-100 cursor-pointer">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Question Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <div className="flex items-center space-x-1">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-700">{question.author}</span>
                              <span className="text-blue-600">({question.authorReputation.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{question.createdAt}</span>
                            </div>
                          </div>
                          
                          {question.isAnswered && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              ✓ Answered
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" className="px-8">
                Load More Questions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
