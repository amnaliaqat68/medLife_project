import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, User, Phone, Mail, MapPin, TrendingUp, Edit, Plus, FileText } from 'lucide-react';
import AddDoctorForm from "../addDoctors/page";


export default function DoctorManagement () {
  const [searchTerm, setSearchTerm] = useState('');
  const[userRole, setUserRole] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

  const doctorData = [
    {
      id: 'DOC-001',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      hospital: 'City General Hospital',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@citygeneral.com',
      location: 'New York, NY',
      totalCommitments: 5,
      activeCSRs: 2,
      totalValue: '$125,000',
      lastContact: '2024-01-15',
      relationship: 'strong',
      status: 'active'
    },
    {
      id: 'DOC-002',
      name: 'Dr. Michael Brown',
      specialty: 'Endocrinology',
      hospital: 'Regional Medical Center',
      phone: '+1 (555) 234-5678',
      email: 'michael.brown@regional.com',
      location: 'Chicago, IL',
      totalCommitments: 3,
      activeCSRs: 1,
      totalValue: '$85,000',
      lastContact: '2024-01-14',
      relationship: 'moderate',
      status: 'active'
    },
    {
      id: 'DOC-003',
      name: 'Dr. Emily Davis',
      specialty: 'Internal Medicine',
      hospital: 'Metro Health Complex',
      phone: '+1 (555) 345-6789',
      email: 'emily.davis@metrohealth.com',
      location: 'Los Angeles, CA',
      totalCommitments: 7,
      activeCSRs: 3,
      totalValue: '$200,000',
      lastContact: '2024-01-13',
      relationship: 'strong',
      status: 'active'
    },
   
  ];

   const getRelationshipColor = (relationship) => {
    switch (relationship) {
      case "strong":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      case "weak":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "potential":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  

  const filteredDoctors = doctorData.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{doctorData.length}</p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Relationships</p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctorData.filter(d => d.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Commitments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {doctorData.reduce((sum, d) => sum + d.totalCommitments, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${doctorData.reduce((sum, d) => sum + parseInt(d.totalValue.replace(/[$,]/g, '')), 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-500" />
            </div>
          </CardContent>
        </Card>
      </div>

    
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Doctor Database</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
             
                <Button
          onClick={() => setShowDrawer(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Add Doctors +
        </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Relationship</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-gray-500">{doctor.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.hospital}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{doctor.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{doctor.location}</span>
                      </div>
                    </TableCell> 
                    <TableCell className="font-semibold text-green-600">{doctor.totalValue}</TableCell>
                    <TableCell>
                      <Badge className={getRelationshipColor(doctor.relationship)}>
                        {doctor.relationship}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(doctor.status)}>
                        {doctor.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{doctor.lastContact}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {(userRole === 'dsm' || userRole === 'District Manager') && (
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {showDrawer && (
    <div className="fixed inset-0 z-50 flex">
      <div className="relative ml-auto w-full max-w-xl h-full bg-white shadow-xl z-50 p-6 overflow-y-auto">
        <button
          onClick={() => setShowDrawer(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ✖
        </button>
        <AddDoctorForm />
      </div>
    </div>
  )}
    </div>
  );
};
