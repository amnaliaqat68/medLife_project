"use client";
import { useState } from "react";
import Head from "next/head";

export default function CSRForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    mioSmioFe: "",
    group: "",
    district: "",
    dsmSm: "",
    drName: "",
    drDesignation: "",
    qualification: "",
    speciality: "",
    address: "",
    cell: "",
    patientsMorning: "",
    patientsEvening: "",
    existingCustomer: false,
    newCustomer: false,
    brickName: "",
    products: Array(1)
      .fill()
      .map(() => ({
        product: "",
        strength: "",
        presentUnits: "",
        expectedUnits: "",
        additionUnits: "",
      })),
    businessValuePresent: 0,
    businessValueExpected: 0,
    businessValueAddition: 0,
    businessPeriod: "",
    expectedTotalBusiness: "",
    roi: "",
    exactCost: "",
    requiredDate: "",
    itemRequested: "",
    byHo: "",
    investmentLastYear: "",
    activity: "",
    activityValue: "",
    activityMonth: "",
    chemists: Array(1)
      .fill()
      .map(() => ({
        chemistName: "",
        businessShare: "",
        otherDoctors: "",
      })),
    investmentInstructions: "",
    comments: "",
    ledgerSummary: Array(1)
      .fill()
      .map(() => ({
        month: "",
        sale: "",
      })),
    mioSmioFeSign: "",
    dsmSdsmSign: "",
    zsmSmSign: "",
    acDepartment: "",
    spmNsm: "",
    md: "",
  });

  const productsList = [
    "Cardivascular Pro",
    "Diabetes Care Plus",
    "Hypertension Relief",
    "Pain Management Pro",
    "Neurological Plus",
    "Respiratory Care",
  ];

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          product: "",
          strength: "",
          presentUnits: "",
          expectedUnits: "",
          additionUnits: "",
        },
      ],
    }));
  };

  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const addChemist = () => {
    setFormData((prev) => ({
      ...prev,
      chemists: [
        ...prev.chemists,
        {
          chemistName: "",
          businessShare: "",
          otherDoctors: "",
        },
      ],
    }));
  };

  const removeChemist = (index) => {
    setFormData((prev) => ({
      ...prev,
      chemists: prev.chemists.filter((_, i) => i !== index),
    }));
  };

  const addLedgerRow = () => {
    setFormData((prev) => ({
      ...prev,
      ledgerSummary: [...prev.ledgerSummary, { month: "", sale: "" }],
    }));
  };

  const removeLedger = (index) => {
    setFormData((prev) => ({
      ...prev,
      ledgerSummary: prev.ledgerSummary.filter((_, i) => i !== index),
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...formData.products];
    updated[index][field] = value;
    setFormData({ ...formData, products: updated });
  };

  const handleInputChange = (
    e,
    index = null,
    field = null,
    subField = null
  ) => {
    const { name, value, type, checked } = e.target;
    if (index !== null && field) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = { ...updatedArray[index], [subField]: value };
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetForm = () => {
    setFormData({
      date: "",
      mioSmioFe: "",
      group: "",
      area: "",
      dsmSm: "",
      drName: "",
      drDesignation: "",
      qualification: "",
      speciality: "",
      address: "",
      cell: "",
      patientsMorning: "",
      patientsEvening: "",
      existingCustomer: false,
      newCustomer: false,
      brickName: "",
      products: Array(1)
        .fill()
        .map(() => ({
          productify: "",
          strength: "",
          presentUnits: "",
          expectedUnits: "",
          additionUnits: "",
        })),
      businessValuePresent: 0,
      businessValueExpected: 0,
      businessValueAddition: 0,
      businessPeriod: "",
      expectedTotalBusiness: "",
      roi: "",
      exactCost: "",
      requiredDate: "",
      itemRequested: "",
      byHo: "",
      investmentLastYear: "",
      activity: "",
      activityValue: "",
      activityMonth: "",
      chemists: Array(1)
        .fill()
        .map(() => ({
          chemistName: "",
          businessShare: "",
          otherDoctors: "",
        })),
      investmentInstructions: "",
      comments: "",
      ledgerSummary: Array(1)
        .fill()
        .map(() => ({
          month: "",
          sale: "",
        })),
      mioSmioFeSign: "",
      dsmSdsmSign: "",
      zsmSmSign: "",
      acDepartment: "",
      spmNsm: "",
      md: "",
    });
    setStep(1);
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Field Force Info */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 border-b pb-2">
          DOctors and DSM information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              MIO / SMIO / FE
            </label>
            <input
              type="text"
              name="mioSmioFe"
              value={formData.mioSmioFe}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Group
            </label>
            <input
              type="text"
              name="group"
              value={formData.group}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700"
            >
              Area
            </label>
            <select
              name="area"
              id="area"
              value={formData.area}
              onChange={handleInputChange}
              required
              className="input border w-[185px]"
            >
              <option value=""></option>
              <option value="multan">Multan</option>
              <option value="faisalabad">Faisalabad</option>
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="abbottabad">Abbottabad</option>
              <option value="sheikhupura">Sheikhupura</option>
              <option value="kasur">Kasur</option>
              <option value="dgk">DGK</option>
              <option value="jampur">Jampur</option>
              <option value="layyah">Layyah</option>
              <option value="ryk">RYK</option>
              <option value="bhp">BHP</option>
              <option value="khanewal">Khanewal</option>
              <option value="sargodha">Sargodha</option>
              <option value="chiniot">Chiniot</option>
              <option value="peshawar">Peshawar</option>
              <option value="charsadda">Charsadda</option>
              <option value="mardan">Mardan</option>
              <option value="nowshera">Nowshera</option>
              <option value="swat">Swat</option>
              <option value="sahiwal">Sahiwal</option>
              <option value="timergara">Timergara</option>
              <option value="burewala">Burewala</option>
              <option value="bhakkar">Bhakkar</option>
              <option value="jhang">Jhang</option>
              <option value="toba">Toba</option>
              <option value="gojra">Gojra</option>
              <option value="gujranwala">Gujranwala</option>
              <option value="sialkot">Sialkot</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              DSM / SM
            </label>
            <input
              type="text"
              name="dsmSm"
              value={formData.dsmSm}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
        </div>
      </section>

      {/* Doctor Details */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Doctor Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor Name
            </label>
            <input
              type="text"
              name="drName"
              value={formData.drName}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="drDesignation"
              value={formData.drDesignation}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Speciality
            </label>
            <input
              type="text"
              name="speciality"
              value={formData.speciality}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input border w-[600px]"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cell
            </label>
            <input
              type="text"
              name="cell"
              value={formData.cell}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patients (Morning)
            </label>
            <input
              type="number"
              name="patientsMorning"
              value={formData.patientsMorning}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patients (Evening)
            </label>
            <input
              type="number"
              name="patientsEvening"
              value={formData.patientsEvening}
              onChange={handleInputChange}
              className="input border"
            />
          </div>
          <div className="flex space-x-6 col-span-2 mt-2">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="existingCustomer"
                checked={formData.existingCustomer}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span>Existing Customer</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="newCustomer"
                checked={formData.newCustomer}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span>New Customer</span>
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Brick Name
            </label>
            <select
              name="brickName"
              id="brickName"
              value={formData.brickName}
              onChange={handleInputChange}
              className="input border w-[600px]"
            >
              <option value="jupyter">Jupyter</option>
              <option value="venus">Venus</option>
              <option value="dynamic">Dynamic</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">
        Business and Approval Details
      </h2>

      {/* Products Table */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Product Commitments
        </h3>
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Product</th>
              <th className="border px-3 py-2">Strength</th>
              <th className="border px-3 py-2">Present</th>
              <th className="border px-3 py-2">Expected</th>
              <th className="border px-3 py-2">Additional</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.products.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-gray-50">
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">
                  <select
                    value={item.product}
                    onChange={(e) =>
                      handleProductChange(index, "product", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                    required
                  >
                    <option value="">Select Product</option>
                    {productsList.map((p, idx) => (
                      <option key={idx} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-3 py-2">
                  <select
                    value={item.strength}
                    onChange={(e) =>
                      handleProductChange(index, "strength", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                    required
                  >
                    <option value="">Select Strength</option>
                    {["100mg", "250mg", "500mg", "1g", "Custom"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-3 py-2">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={item.presentUnits}
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "presentUnits",
                        Number(e.target.value)
                      )
                    }
                    className="w-full px-2 py-1 border rounded"
                    placeholder="0"
                    required
                  />
                </td>
                <td className="border px-3 py-2">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={item.expectedUnits}
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "expectedUnits",
                        Number(e.target.value)
                      )
                    }
                    className="w-full px-2 py-1 border rounded"
                    placeholder="0"
                    required
                  />
                </td>
                <td className="border px-3 py-2">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={item.additionUnits}
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "additionUnits",
                        Number(e.target.value)
                      )
                    }
                    className="w-full px-2 py-1 border rounded"
                    placeholder="0"
                    required
                  />
                </td>
                <td className="border px-3 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Business Metrics */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Business Value & Activity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "CSR By HO", name: "byHo" },
            {
              label: "Business Value/Month (Present)",
              name: "businessValuePresent",
            },
            {
              label: "Business Value/Month (Expected)",
              name: "businessValueExpected",
            },
            {
              label: "Business Value/Month (Addition)",
              name: "businessValueAddition",
            },
            { label: "Business Period (Months)", name: "businessPeriod" },
            {
              label: "Expected Total Business (Value)",
              name: "expectedTotalBusiness",
            },

            { label: "ROI %", name: "roi" },
            { label: "Exact Cost", name: "exactCost" },
            { label: "Required Date", name: "requiredDate", type: "date" },

            { label: "Investment Last Year", name: "investmentLastYear" },
            { label: "Activity", name: "activity" },
            { label: "Activity Value", name: "activityValue" },
            { label: "Activity Month (Last 12 Months)", name: "activityMonth" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="input border"
              />
            </div>
          ))}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Item Requested (Complete Specifications)
            </label>
            <textarea
              name="itemRequested"
              value={formData.itemRequested}
              onChange={handleInputChange}
              rows={3}
              className="input border w-full"
            />
          </div>
        </div>
      </div>

      {/* Chemist Table */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Chemist Monitoring the Business
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Chemist Name</th>
                <th className="px-4 py-2 border">Business Share (%)</th>
                <th className="px-4 py-2 border">Other Doctors</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.chemists.map((chemist, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={chemist.chemistName}
                      onChange={(e) =>
                        handleInputChange(e, index, "chemists", "chemistName")
                      }
                      className="input border"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={chemist.businessShare}
                      onChange={(e) =>
                        handleInputChange(e, index, "chemists", "businessShare")
                      }
                      className="input border"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={chemist.otherDoctors}
                      onChange={(e) =>
                        handleInputChange(e, index, "chemists", "otherDoctors")
                      }
                      className="input border"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeChemist(index)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addChemist}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + Add Chemist
          </button>
        </div>
      </div>

      {/* Additional Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instructions for Investment
          </label>
          <textarea
            name="investmentInstructions"
            value={formData.investmentInstructions}
            onChange={handleInputChange}
            rows={3}
            className="input border w-[300px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Any Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows={3}
            className="input border w-[300px]"
          />
        </div>
      </div>

      {/* Ledger Summary */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Ledger Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 border">Month</th>
                <th className="px-4 py-2 border">Customer's Sale</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.ledgerSummary.map((ledger, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={ledger.month}
                      onChange={(e) =>
                        handleInputChange(e, index, "ledgerSummary", "month")
                      }
                      className="input border"
                      placeholder={`Month ${index + 1}`}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={ledger.sale}
                      onChange={(e) =>
                        handleInputChange(e, index, "ledgerSummary", "sale")
                      }
                      className="input border"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeLedger(index)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={addLedgerRow}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + Add Row
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>CSR Performa Form</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Customer Service Request Performa
        </h1>
        <div className="flex justify-between mb-6">
          <div>Step {step} of 2</div>
          <div>
            <button
              onClick={resetForm}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {step < 2 && (
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          )}
          {step === 2 && (
            <button
              onClick={() => alert("Form submitted!")}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
