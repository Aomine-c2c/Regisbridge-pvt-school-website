'use client'

/**
 * Data Entry Component for Extracting Information from Business Documents
 * This component helps manually enter data extracted from Excel/Word files
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Copy, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function DataEntryTool() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('school-info')

  // School Information State
  const [schoolInfo, setSchoolInfo] = useState({
    fullName: 'Regisbridge Private School',
    legalName: 'Regisbridge Group of Schools',
    motto: 'Supervincimus - We Conquer Together',
    mission: '',
    vision: '',
    address: '',
    city: 'Harare',
    country: 'Zimbabwe',
    phone: '',
    email: '',
    website: 'https://regisbridge.ac.zw',
  })

  // Fee Structure State
  const [feeEntry, setFeeEntry] = useState({
    grade: '',
    term: '',
    year: '2025',
    tuition: '',
    boarding: '',
    development: '',
    exam: '',
    transport: '',
    other: '',
  })

  const [fees, setFees] = useState<any[]>([])

  // Financial Record State
  const [financialEntry, setFinancialEntry] = useState({
    date: '',
    category: '',
    description: '',
    amount: '',
    type: 'expenditure',
    month: '',
    year: '2025',
  })

  const [financialRecords, setFinancialRecords] = useState<any[]>([])

  const handleCopySchoolConfig = () => {
    const config = `export const schoolConfig = {
  name: {
    full: '${schoolInfo.fullName}',
    short: 'Regisbridge',
    legal: '${schoolInfo.legalName}',
  },
  motto: {
    latin: 'Supervincimus',
    english: 'We Conquer Together',
  },
  mission: '${schoolInfo.mission}',
  vision: '${schoolInfo.vision}',
  contact: {
    email: {
      main: '${schoolInfo.email}',
      admissions: 'admissions@regisbridge.ac.zw',
      accounts: 'accounts@regisbridge.ac.zw',
    },
    phone: {
      main: '${schoolInfo.phone}',
    },
    address: {
      street: '${schoolInfo.address}',
      city: '${schoolInfo.city}',
      country: '${schoolInfo.country}',
    },
  },
  urls: {
    website: '${schoolInfo.website}',
  },
}`

    navigator.clipboard.writeText(config)
    toast({
      title: 'Copied to Clipboard',
      description: 'School configuration code copied. Paste into school-config.ts',
    })
  }

  const handleAddFee = () => {
    const total =
      parseFloat(feeEntry.tuition || '0') +
      parseFloat(feeEntry.boarding || '0') +
      parseFloat(feeEntry.development || '0') +
      parseFloat(feeEntry.exam || '0') +
      parseFloat(feeEntry.transport || '0') +
      parseFloat(feeEntry.other || '0')

    const newFee = {
      id: `FEE-${Date.now()}`,
      ...feeEntry,
      totalAmount: total,
      currency: 'USD',
    }

    setFees([...fees, newFee])
    toast({
      title: 'Fee Added',
      description: `Added ${feeEntry.grade} - Term ${feeEntry.term} ${feeEntry.year}`,
    })

    // Reset form
    setFeeEntry({
      ...feeEntry,
      grade: '',
      tuition: '',
      boarding: '',
      development: '',
      exam: '',
      transport: '',
      other: '',
    })
  }

  const handleCopyFees = () => {
    const json = JSON.stringify(fees, null, 2)
    navigator.clipboard.writeText(json)
    toast({
      title: 'Copied to Clipboard',
      description: `${fees.length} fee structures copied as JSON`,
    })
  }

  const handleAddFinancialRecord = () => {
    const newRecord = {
      id: `FIN-${Date.now()}`,
      ...financialEntry,
      amount: parseFloat(financialEntry.amount),
    }

    setFinancialRecords([...financialRecords, newRecord])
    toast({
      title: 'Record Added',
      description: `Added ${financialEntry.type}: $${financialEntry.amount}`,
    })

    // Reset form
    setFinancialEntry({
      ...financialEntry,
      date: '',
      category: '',
      description: '',
      amount: '',
    })
  }

  const handleCopyFinancialRecords = () => {
    const json = JSON.stringify(financialRecords, null, 2)
    navigator.clipboard.writeText(json)
    toast({
      title: 'Copied to Clipboard',
      description: `${financialRecords.length} financial records copied as JSON`,
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Extraction Tool</h1>
        <p className="text-gray-600">
          Manually enter data extracted from business documents (Excel/Word files)
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="school-info">School Info</TabsTrigger>
          <TabsTrigger value="fees">Fee Structures</TabsTrigger>
          <TabsTrigger value="financial">Financial Records</TabsTrigger>
        </TabsList>

        {/* School Information Tab */}
        <TabsContent value="school-info">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>
                Extract from Constitution documents and School Proposals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={schoolInfo.fullName}
                    onChange={(e) =>
                      setSchoolInfo({ ...schoolInfo, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    value={schoolInfo.legalName}
                    onChange={(e) =>
                      setSchoolInfo({ ...schoolInfo, legalName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  rows={3}
                  value={schoolInfo.mission}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, mission: e.target.value })}
                  placeholder="Enter mission statement from constitution document"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vision">Vision Statement</Label>
                <Textarea
                  id="vision"
                  rows={3}
                  value={schoolInfo.vision}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, vision: e.target.value })}
                  placeholder="Enter vision statement from constitution document"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={schoolInfo.address}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, address: e.target.value })}
                    placeholder="Street address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={schoolInfo.phone}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, phone: e.target.value })}
                    placeholder="+263 4 123456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={schoolInfo.email}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, email: e.target.value })}
                    placeholder="info@regisbridge.ac.zw"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={schoolInfo.website}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, website: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleCopySchoolConfig} className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Copy Configuration Code
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fee Structures Tab */}
        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure Entry</CardTitle>
              <CardDescription>
                Extract from REGISBRIDGE FEES UPDATE FINAL.xlsx and other fee documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Form</Label>
                  <Select value={feeEntry.grade} onValueChange={(value) => setFeeEntry({ ...feeEntry, grade: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 1">Grade 1</SelectItem>
                      <SelectItem value="Grade 2">Grade 2</SelectItem>
                      <SelectItem value="Grade 3">Grade 3</SelectItem>
                      <SelectItem value="Grade 4">Grade 4</SelectItem>
                      <SelectItem value="Grade 5">Grade 5</SelectItem>
                      <SelectItem value="Grade 6">Grade 6</SelectItem>
                      <SelectItem value="Grade 7">Grade 7</SelectItem>
                      <SelectItem value="Form 1">Form 1</SelectItem>
                      <SelectItem value="Form 2">Form 2</SelectItem>
                      <SelectItem value="Form 3">Form 3</SelectItem>
                      <SelectItem value="Form 4">Form 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="term">Term</Label>
                  <Select value={feeEntry.term} onValueChange={(value) => setFeeEntry({ ...feeEntry, term: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Term 1</SelectItem>
                      <SelectItem value="2">Term 2</SelectItem>
                      <SelectItem value="3">Term 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={feeEntry.year}
                    onChange={(e) => setFeeEntry({ ...feeEntry, year: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tuition">Tuition ($)</Label>
                  <Input
                    id="tuition"
                    type="number"
                    value={feeEntry.tuition}
                    onChange={(e) => setFeeEntry({ ...feeEntry, tuition: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="boarding">Boarding ($)</Label>
                  <Input
                    id="boarding"
                    type="number"
                    value={feeEntry.boarding}
                    onChange={(e) => setFeeEntry({ ...feeEntry, boarding: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="development">Development ($)</Label>
                  <Input
                    id="development"
                    type="number"
                    value={feeEntry.development}
                    onChange={(e) => setFeeEntry({ ...feeEntry, development: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exam">Exam ($)</Label>
                  <Input
                    id="exam"
                    type="number"
                    value={feeEntry.exam}
                    onChange={(e) => setFeeEntry({ ...feeEntry, exam: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transport">Transport ($)</Label>
                  <Input
                    id="transport"
                    type="number"
                    value={feeEntry.transport}
                    onChange={(e) => setFeeEntry({ ...feeEntry, transport: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other">Other ($)</Label>
                  <Input
                    id="other"
                    type="number"
                    value={feeEntry.other}
                    onChange={(e) => setFeeEntry({ ...feeEntry, other: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleAddFee} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Add Fee Structure
              </Button>

              {fees.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Added Fees ({fees.length})</Label>
                    <Button onClick={handleCopyFees} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Copy JSON
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                    {fees.map((fee) => (
                      <div key={fee.id} className="py-2 border-b last:border-0">
                        <div className="font-medium">
                          {fee.grade} - Term {fee.term} {fee.year}
                        </div>
                        <div className="text-sm text-gray-600">
                          Tuition: ${fee.tuition}, Boarding: ${fee.boarding}, Total: ${fee.totalAmount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Records Tab */}
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Record Entry</CardTitle>
              <CardDescription>
                Extract from monthly expenditure and income Excel files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={financialEntry.date}
                    onChange={(e) =>
                      setFinancialEntry({ ...financialEntry, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={financialEntry.type}
                    onValueChange={(value) => setFinancialEntry({ ...financialEntry, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expenditure">Expenditure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={financialEntry.amount}
                    onChange={(e) =>
                      setFinancialEntry({ ...financialEntry, amount: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={financialEntry.category}
                    onChange={(e) =>
                      setFinancialEntry({ ...financialEntry, category: e.target.value })
                    }
                    placeholder="e.g., Salaries, Utilities, Tuition Fees"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Select
                    value={financialEntry.month}
                    onValueChange={(value) => setFinancialEntry({ ...financialEntry, month: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="August">August</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                      <SelectItem value="November">November</SelectItem>
                      <SelectItem value="December">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={financialEntry.description}
                  onChange={(e) =>
                    setFinancialEntry({ ...financialEntry, description: e.target.value })
                  }
                  placeholder="Brief description of the transaction"
                />
              </div>

              <Button onClick={handleAddFinancialRecord} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Add Financial Record
              </Button>

              {financialRecords.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Added Records ({financialRecords.length})</Label>
                    <Button onClick={handleCopyFinancialRecords} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Copy JSON
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                    {financialRecords.map((record) => (
                      <div key={record.id} className="py-2 border-b last:border-0">
                        <div className="font-medium">
                          {record.category} - ${record.amount}
                        </div>
                        <div className="text-sm text-gray-600">
                          {record.type} | {record.month} {record.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
