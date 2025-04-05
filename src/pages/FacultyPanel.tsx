
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, BookOpen, Calendar } from 'lucide-react';

const FacultyPanel: React.FC = () => {
  const { isFaculty } = useRoleCheck();
  
  // Redirect if not a faculty member
  if (!isFaculty()) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-academy-50 to-white py-8">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
            <p className="text-gray-600">Manage your academic resources and student interactions</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Resources</CardTitle>
                <BookOpen className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-gray-500">3 added this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Student Requests</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-500">5 new this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Forum Activity</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">157</div>
                <p className="text-xs text-gray-500">+24% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="resources" className="space-y-4">
            <TabsList>
              <TabsTrigger value="resources">My Resources</TabsTrigger>
              <TabsTrigger value="requests">Student Requests</TabsTrigger>
              <TabsTrigger value="discussions">Forum Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Academic Resources</CardTitle>
                  <CardDescription>Manage the resources you've contributed to the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button className="bg-academy-600 hover:bg-academy-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Add New Resource
                    </Button>
                  </div>
                  
                  <div className="border rounded-md">
                    <div className="p-4 font-medium bg-gray-50 border-b">
                      Resource data would be loaded and displayed here
                    </div>
                    <div className="p-8 text-center text-gray-500">
                      This is a mockup. In a real implementation, this would fetch and display faculty resources.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Requests</CardTitle>
                  <CardDescription>Review and respond to resource requests from students.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-8 text-center text-gray-500">
                    Student request management functionality would go here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Forum Discussions</CardTitle>
                  <CardDescription>Participate in academic discussions and answer student questions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-8 text-center text-gray-500">
                    Forum discussions would be displayed here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacultyPanel;
