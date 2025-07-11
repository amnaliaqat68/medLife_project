'use client'

import { useState } from "react";
import { FileText, Users, TrendingUp, Calendar, CheckCircle, Clock, User, Link } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";


const SMpage = () => {
  const [userRole, setUserRole] = useState("dsm"); // ✅ FIX: Updated to lowercase
  const [createdCSR, setCreatedCSR] = useState(false);
  const router = useRouter();

  const stats = {
    totalCSR: 30,
    pendingApprovals: 12,
    completedThisMonth: 23,
    totalDoctors: 156,
    activeCommitments: 78,
    conversionRate: 68,
  };

  const recentActivities = [
    {
      id: 1,
      type: "CSR Created",
      description: "New CSR for Dr. Ashar - Cardiology",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "Approval",
      description: "CSR-2024-001 approved by District Manager",
      time: "4 hours ago",
      status: "approved",
    },
    {
      id: 3,
      type: "Commitment",
      description: "Dr. Johnson committed to 500 units/month",
      time: "1 day ago",
      status: "active",
    },
    {
      id: 4,
      type: "Meeting",
      description: "Follow-up meeting scheduled with Dr. Brown",
      time: "2 days ago",
      status: "scheduled",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-indigo-100 to-teal-100">
 
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MedLife CSR</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button>Log Out</button>
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">Amna</span>
            </div>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {userRole}
          </h2>
          <p className="text-gray-600">
            Manage your pharmaceutical sales requests and track doctor commitments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total CSRs</p>
                  <p className="text-2xl font-bold">{stats.totalCSR}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">{stats.completedThisMonth}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Doctors</p>
                  <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Commitments</p>
                  <p className="text-2xl font-bold">{stats.activeCommitments}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-teal-500">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
               <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="csrs">CSRs</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
              
            </TabsList>

           {(userRole === "dsm") && ( // ✅ FIX: Updated to lowercase
              <Button
                onClick={() => router.push('/SMuser/CreatedCSR')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create CSR
              </Button>
            )}
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">{activity.type}</p>
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <FileText className="w-6 h-6" />
                      <span className="text-sm">New CSR</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Users className="w-6 h-6" />
                      <span className="text-sm">Add Doctor</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-sm">Review Approvals</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <TrendingUp className="w-6 h-6" />
                      <span className="text-sm">View Reports</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      {/* {createdCSR && (
  <CreatedCSR
    isOpen={createdCSR}
    onClose={() => setCreatedCSR(false)}
    userRole={userRole}
  />
)} */}
    </div>
  );
};

export default SMpage;
