"use client";

import { useState } from "react";
import {
  FileText,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  User,
  Link,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateUserpage from "../createUser/page";
import DoctorManagement from "../doctormanagement/page";


const admin = () => {
  const [userRole, setUserRole] = useState("Admin");
  const [showcreateUser, setShowcreateUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const stats = {
    totalCSR: 30,
    totalDoctors: 156,
    TotalValues: 78,
    ExecutionThismonth: 68,
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
            Manage your pharmaceutical sales requests and track doctor
            commitments
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

          <Card className="border-l-4 border-l-teal-500">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Execution This month</p>
                  <p className="text-2xl font-bold">
                    {stats.ExecutionThismonth}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
  <div className="flex justify-between items-center">
    <TabsList className="grid w-full max-w-3xl grid-cols-5">
      <TabsTrigger value="dashboard">User Management</TabsTrigger>
      <TabsTrigger value="doctors">Doctors</TabsTrigger>
      <TabsTrigger value="csrs">Approved CSRs</TabsTrigger>
      <TabsTrigger value="reports">Reports</TabsTrigger>
      <TabsTrigger value="approvals">Analytics</TabsTrigger>
    </TabsList>

    {userRole === "Admin" && (
      <div className="flex gap-4">
        <Button
          onClick={() => setShowcreateUser(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Create Users
        </Button>

        
      </div>
    )}
  </div>

  {/* Tab content for User Management */}
  <TabsContent value="dashboard">
    <Card>
      <CardHeader>
        <CardTitle>Created Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="p-2 bg-white rounded shadow flex justify-between">
            <span>Name: John SM</span>
            <Badge variant="outline">Role: SM</Badge>
          </li>
          <li className="p-2 bg-white rounded shadow flex justify-between">
            <span>Name: Sarah DSM</span>
            <Badge variant="secondary">Role: dsm</Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="doctors">
  <DoctorManagement /> 
</TabsContent>

 
  

  {/* Create User drawer */}
  {showcreateUser && (
    <div className="fixed inset-0 z-50 flex">
      <div className="relative ml-auto w-full max-w-xl h-full bg-white shadow-xl z-50 p-6 overflow-y-auto">
        <button
          onClick={() => setShowcreateUser(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ✖
        </button>
        <CreateUserpage />
      </div>
    </div>
  )}
</Tabs>

      </main>
    </div>
  );
};

export default admin;
