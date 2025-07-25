"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { LogOut, Plus, Users } from "lucide-react";

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "HealthCorp Medical",
      email: "contact@healthcorp.com",
      role: "admin",
      password: "234",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [userRole] = useState("SuperAdmin");

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/landing-page/log-in");
      } else {
        console.error("Logout failed");
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/createAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
       credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.error);
    alert("User created!");

    // Append new user to UI list
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name,
        email: form.email,
        role: form.role,
        password: "••••••••",
      },
    ]);

    // Reset form
    setForm({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-indigo-100 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Image src="/Medlife logo.png" alt="Logo" width={40} height={40} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MedLife</h1>
              <p className="text-sm text-gray-500">System Administration</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Welcome & Stats */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="px-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, {userRole}
          </h2>
          <p className="text-gray-600 mb-6">
            Manage your pharmaceutical sales requests and track doctor commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 mb-8">
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Table */}
        <div className="px-6 pb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Healthcare Organizations</CardTitle>
                  <CardDescription>
                    Manage companies using your MedLife platform
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Organization User</DialogTitle>
                      <DialogDescription>
                        Add a new Admin or GM to the MedLife platform
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreate}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">User Name</Label>
                          <Input
                            id="name"
                            value={form.name}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, name: e.target.value }))
                            }
                            placeholder="e.g., General Hospital"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Contact Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, email: e.target.value }))
                            }
                            placeholder="admin@hospital.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="role">Role</Label>
                          <Select
                            onValueChange={(value) =>
                              setForm((f) => ({ ...f, role: value }))
                            }
                            value={form.role}
                          >
                            <SelectTrigger id="role">
                              <SelectValue placeholder="Select a Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="gm">GM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, password: e.target.value }))
                            }
                            placeholder="********"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Create User
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Password</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.password}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
