
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare, User, Clock, Check, Flag, Share2, Bookmark, Award, Eye, ArrowLeft, Zap } from "lucide-react";
import { mockQuestions, mockAnswers } from "@/data/mockData";



const QuestionDetail = () => {
  const { id } = useParams();
  const questionId = parseInt(id || "1");
  const [hasVoted, setHasVoted] = useState(false);

  const question = mockQuestions.find(q => q.id === questionId) || mockQuestions[0];
  const questionAnswers = mockAnswers.filter(a => a.questionId === questionId);
  
  const [answers, setAnswers] = useState(questionAnswers);
  const [newAnswer, setNewAnswer] = useState("");
  const [questionVotes, setQuestionVotes] = useState(question.votes);

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      const answer = {
        id: Date.now(),
        questionId: questionId,
        content: newAnswer,
        author: "alex_frontend",
        authorReputation: 12340,
        createdAt: "just now",
        votes: 0,
        isAccepted: false
      };
      setAnswers([...answers, answer]);
      setNewAnswer("");
    }
  };

  const handleVote = (answerId: number, voteType: 'up' | 'down') => {
    setAnswers(answers.map(answer => 
      answer.id === answerId 
        ? { ...answer, votes: answer.votes + (voteType === 'up' ? 1 : -1) }
        : answer
    ));
  };

  const handleAcceptAnswer = (answerId: number) => {
    setAnswers(answers.map(answer => ({
      ...answer,
      isAccepted: answer.id === answerId
    })));
  };

const handleQuestionVote = (voteType: 'up' | 'down') => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged IN.');
    return;
  }

  if (hasVoted) {
    alert('You already voted!');
    return;
  }

  setQuestionVotes(prev => prev + (voteType === 'up' ? 1 : -1));
  setHasVoted(true);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Questions</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
                  {question.bounty && (
                    <Badge className="bg-yellow-100 text-yellow-800 flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      +{question.bounty} bounty
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span className="font-medium text-gray-700">{question.author}</span>
                    <span className="text-blue-600">({question.authorReputation.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>asked {question.createdAt}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{question.views.toLocaleString()} views</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="hover:bg-blue-100 cursor-pointer">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <div className="flex flex-col items-center space-y-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 hover:bg-green-50 hover:text-green-600"
                  onClick={() => handleQuestionVote('up')}
                >
                  <ThumbsUp className="w-6 h-6" />
                </Button>
                <span className="text-xl font-semibold text-gray-700">{questionVotes}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleQuestionVote('down')}
                >
                  <ThumbsDown className="w-6 h-6" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="prose prose-blue max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">{question.description}</pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {answers.length} Answer{answers.length !== 1 ? 's' : ''}
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Oldest</Button>
              <Button variant="outline" size="sm">Votes</Button>
              <Button variant="default" size="sm">Active</Button>
            </div>
          </div>

          <div className="space-y-6">
            {answers.map(answer => (
              <Card key={answer.id} className={`${answer.isAccepted ? 'ring-2 ring-green-500 bg-green-50/30' : ''} hover:shadow-md transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 hover:bg-green-50 hover:text-green-600"
                        onClick={() => handleVote(answer.id, 'up')}
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </Button>
                      <span className="text-lg font-semibold text-gray-700">{answer.votes}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleVote(answer.id, 'down')}
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </Button>
                      {!answer.isAccepted && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50"
                          onClick={() => handleAcceptAnswer(answer.id)}
                          title="Accept this answer"
                        >
                          <Check className="w-5 h-5" />
                        </Button>
                      )}
                      {answer.isAccepted && (
                        <div className="p-2 text-green-600 bg-green-100 rounded">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="prose prose-blue max-w-none mb-4">
                        <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">{answer.content}</pre>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700">{answer.author}</span>
                            <span className="text-blue-600">({answer.authorReputation.toLocaleString()})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>answered {answer.createdAt}</span>
                          </div>
                          {answer.isAccepted && (
                            <Badge className="bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Accepted Answer
                            </Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                            Share
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                            <Flag className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Answer Form */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Your Answer</h3>
            <p className="text-sm text-gray-600">
              Thanks for contributing an answer to StackIt! Please be sure to answer the question with details and share your research.
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your answer here... You can use **bold**, *italic*, `code`, and [links](url)."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="min-h-40 mb-4"
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                You can use <strong>**bold**</strong>, <em>*italic*</em>, <code>`code`</code>, and [links](url) formatting.
              </div>
              <Button 
                onClick={handleSubmitAnswer} 
                disabled={!newAnswer.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Post Your Answer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionDetail;
