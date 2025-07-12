
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Plus, Bold, Italic, List, Link, Image, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const suggestedTags = ["React", "JavaScript", "TypeScript", "Node.js", "CSS", "HTML", "Python", "Java", "C++", "Database"];

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim()) && tags.length < 5) {
      setTags([...tags, tag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (title.trim() && description.trim() && tags.length > 0) {
      console.log("Submitting question:", { title, description, tags });
      // Here you would typically send the data to your backend
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Question</h1>
          <p className="text-gray-600">
            Get help from the community by asking a clear, detailed question.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Question Title</h2>
                <p className="text-sm text-gray-600">
                  Be specific and imagine you're asking a question to another person.
                </p>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="e.g., How to implement JWT authentication in React?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />
                <div className="mt-2 text-sm text-gray-500">
                  {title.length}/150 characters
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Question Details</h2>
                <p className="text-sm text-gray-600">
                  Introduce the problem and expand on what you put in the title.
                </p>
              </CardHeader>
              <CardContent>
                {/* Rich Text Toolbar */}
                <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-gray-50">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button variant="ghost" size="sm" className="p-2">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Link className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Image className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <Button variant="ghost" size="sm" className="p-2">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <AlignRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <Textarea
                  placeholder="Describe your problem in detail. Include what you've tried, what you expected to happen, and what actually happened. You can use markdown formatting."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-48 rounded-t-none border-t-0"
                />
                
                <div className="mt-2 text-sm text-gray-500">
                  Use **bold** for emphasis, `code` for inline code, and ```code blocks``` for multi-line code.
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Tags</h2>
                <p className="text-sm text-gray-600">
                  Add up to 5 tags to describe what your question is about.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Tag Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a tag (e.g., React, JavaScript)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag(currentTag);
                        }
                      }}
                      disabled={tags.length >= 5}
                    />
                    <Button
                      onClick={() => handleAddTag(currentTag)}
                      disabled={!currentTag.trim() || tags.length >= 5}
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Suggested Tags */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags
                        .filter(tag => !tags.includes(tag))
                        .slice(0, 8)
                        .map(tag => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                            onClick={() => handleAddTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex space-x-4">
              <Button 
                onClick={handleSubmit}
                disabled={!title.trim() || !description.trim() || tags.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Post Your Question
              </Button>
              <Button variant="outline">
                Save as Draft
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <h3 className="font-semibold">Writing Tips</h3>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Title</h4>
                  <p className="text-gray-600">Make it specific and clear. What's the core issue?</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Details</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• What did you try?</li>
                    <li>• What did you expect?</li>
                    <li>• What happened instead?</li>
                    <li>• Include relevant code</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Tags</h4>
                  <p className="text-gray-600">Choose tags that experts in those areas would follow.</p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Formatting Help</h4>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div><code>**bold**</code> → <strong>bold</strong></div>
                    <div><code>*italic*</code> → <em>italic</em></div>
                    <div><code>`code`</code> → <code>code</code></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
