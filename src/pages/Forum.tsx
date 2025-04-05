
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Users, 
  Search, 
  PlusCircle, 
  Tag,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCheck
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ForumTopic {
  id: string;
  title: string;
  category: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  lastPost: {
    author: string;
    date: string;
    avatarUrl?: string;
  };
  replies: number;
  views: number;
  isNew?: boolean;
  isPinned?: boolean;
  isSolved?: boolean;
  tags?: string[];
}

const Forum: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');

  // Sample forum topics data
  const topics: ForumTopic[] = [
    {
      id: '1',
      title: 'Resources for Machine Learning fundamentals?',
      category: 'Computer Science',
      author: {
        name: 'Alex Johnson',
        avatarUrl: '',
      },
      createdAt: '2023-03-15',
      lastPost: {
        author: 'Maria Chen',
        date: '2 hours ago',
        avatarUrl: '',
      },
      replies: 12,
      views: 143,
      isNew: true,
      tags: ['machine learning', 'beginners', 'textbooks'],
    },
    {
      id: '2',
      title: 'Looking for recent papers on climate change impact on marine ecosystems',
      category: 'Biology',
      author: {
        name: 'Maria Chen',
        avatarUrl: '',
      },
      createdAt: '2023-03-12',
      lastPost: {
        author: 'David Kim',
        date: '1 day ago',
        avatarUrl: '',
      },
      replies: 5,
      views: 87,
      tags: ['climate change', 'marine biology', 'research papers'],
    },
    {
      id: '3',
      title: 'Recommendations for quantum physics textbooks for beginners?',
      category: 'Physics',
      author: {
        name: 'David Kim',
        avatarUrl: '',
      },
      createdAt: '2023-03-10',
      lastPost: {
        author: 'Alex Johnson',
        date: '3 days ago',
        avatarUrl: '',
      },
      replies: 18,
      views: 220,
      isSolved: true,
      tags: ['quantum physics', 'textbooks', 'beginners'],
    },
    {
      id: '4',
      title: '[ANNOUNCEMENT] New research papers added to the database - March 2023',
      category: 'Announcements',
      author: {
        name: 'Admin',
        avatarUrl: '',
      },
      createdAt: '2023-03-05',
      lastPost: {
        author: 'Admin',
        date: '5 days ago',
        avatarUrl: '',
      },
      replies: 3,
      views: 312,
      isPinned: true,
      tags: ['announcements', 'updates', 'new resources'],
    },
    {
      id: '5',
      title: 'Discussion: Ethics in AI research and development',
      category: 'Ethics',
      author: {
        name: 'Sarah Williams',
        avatarUrl: '',
      },
      createdAt: '2023-03-01',
      lastPost: {
        author: 'John Doe',
        date: '1 week ago',
        avatarUrl: '',
      },
      replies: 32,
      views: 278,
      tags: ['AI ethics', 'research ethics', 'discussion'],
    },
  ];

  // Filter and sort topics based on current filters
  const filteredTopics = topics
    .filter(topic => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!topic.title.toLowerCase().includes(query) &&
            !topic.category.toLowerCase().includes(query) &&
            !topic.tags?.some(tag => tag.toLowerCase().includes(query))) {
          return false;
        }
      }
      
      // Filter by category
      if (categoryFilter !== 'all' && topic.category !== categoryFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort topics
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      if (sortOrder === 'latest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortOrder === 'activity') {
        return b.replies - a.replies;
      } else if (sortOrder === 'views') {
        return b.views - a.views;
      }
      
      return 0;
    });

  // Get unique categories for the filter
  const categories = ['all', ...new Set(topics.map(topic => topic.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-b from-academy-50 to-white py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Discussion Forums</h1>
                <p className="text-gray-600">
                  Connect with fellow academics, ask questions, and share insights
                </p>
              </div>
              
              <Link to="/forum/new">
                <Button className="bg-academy-600 hover:bg-academy-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Discussion
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Filters and search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search discussions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={sortOrder} 
                onValueChange={setSortOrder}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="activity">Most Active</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Tabs and topic list */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all" className="flex gap-2">
                <MessageSquare className="h-4 w-4" />
                All Discussions
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex gap-2">
                <TrendingUp className="h-4 w-4" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex gap-2">
                <Clock className="h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="solved" className="flex gap-2">
                <CheckCheck className="h-4 w-4" />
                Solved
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="bg-white border rounded-lg overflow-hidden">
                {/* Table header */}
                <div className="hidden md:grid grid-cols-forum bg-gray-50 py-3 px-6 text-sm font-medium text-gray-500 border-b">
                  <div className="col-span-3">Topic</div>
                  <div>Category</div>
                  <div>Replies</div>
                  <div>Views</div>
                  <div className="col-span-2">Last Post</div>
                </div>
                
                {/* Topics list */}
                {filteredTopics.length > 0 ? (
                  <div className="divide-y">
                    {filteredTopics.map((topic) => (
                      <div key={topic.id} className={`py-4 px-6 ${topic.isPinned ? 'bg-yellow-50' : ''}`}>
                        {/* Mobile view */}
                        <div className="md:hidden">
                          <div className="flex items-center justify-between mb-2">
                            <Link 
                              to={`/forum/topic/${topic.id}`} 
                              className="text-base font-medium text-gray-900 hover:text-academy-600"
                            >
                              {topic.title}
                            </Link>
                            {topic.isNew && (
                              <Badge className="bg-green-500 text-white text-xs">New</Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {topic.tags?.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5 mr-1">
                                <AvatarImage src={topic.author.avatarUrl} />
                                <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{topic.author.name}</span>
                            </div>
                            <Badge variant="outline" className="font-normal">
                              {topic.category}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                            <div className="flex gap-3">
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {topic.replies}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {topic.views}
                              </div>
                            </div>
                            <div>
                              Last post: {topic.lastPost.date}
                            </div>
                          </div>
                        </div>
                        
                        {/* Desktop view */}
                        <div className="hidden md:grid md:grid-cols-forum md:items-center">
                          <div className="col-span-3 flex items-start gap-3">
                            <div className="pt-1">
                              {topic.isPinned ? (
                                <Tag className="h-5 w-5 text-yellow-500" />
                              ) : topic.isSolved ? (
                                <CheckCheck className="h-5 w-5 text-green-500" />
                              ) : (
                                <MessageSquare className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <Link 
                                  to={`/forum/topic/${topic.id}`} 
                                  className="text-base font-medium text-gray-900 hover:text-academy-600"
                                >
                                  {topic.title}
                                </Link>
                                {topic.isNew && (
                                  <Badge className="bg-green-500 text-white text-xs">New</Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Avatar className="h-4 w-4 mr-1">
                                    <AvatarImage src={topic.author.avatarUrl} />
                                    <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  {topic.author.name}
                                </div>
                                <span>•</span>
                                <span>{topic.lastPost.date}</span>
                              </div>
                              
                              {topic.tags && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {topic.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <Badge variant="outline" className="font-normal">
                              {topic.category}
                            </Badge>
                          </div>
                          
                          <div className="text-center text-gray-600">
                            {topic.replies}
                          </div>
                          
                          <div className="text-center text-gray-600">
                            {topic.views}
                          </div>
                          
                          <div className="col-span-2 flex items-center gap-2 text-sm">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={topic.lastPost.avatarUrl} />
                              <AvatarFallback>{topic.lastPost.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-gray-900">{topic.lastPost.author}</div>
                              <div className="text-gray-500 text-xs">{topic.lastPost.date}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No discussions found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or filters, or start a new discussion.
                    </p>
                    <Link to="/forum/new">
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Discussion
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <div className="py-12 text-center bg-white border rounded-lg">
                <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Popular Discussions</h3>
                <p className="text-gray-500">
                  Most active discussions from the past week will appear here.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <div className="py-12 text-center bg-white border rounded-lg">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Recent Discussions</h3>
                <p className="text-gray-500">
                  Most recent discussions will appear here.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="solved" className="mt-0">
              <div className="py-12 text-center bg-white border rounded-lg">
                <CheckCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Solved Discussions</h3>
                <p className="text-gray-500">
                  Discussions marked as solved will appear here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Forum;
