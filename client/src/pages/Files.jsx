import { useState } from "react";

function Files() {
  const [files, setFiles] = useState([
    { id: 1, name: "Report-Q1.xlsx", uploadedAt: "2024-03-15", size: "2.5 MB" },
    { id: 2, name: "Data-Analysis.xlsx", uploadedAt: "2024-03-16", size: "1.8 MB" },
  ]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.file;

    if (fileInput.files.length === 0) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("user_id", "123"); // Replace with actual user_id

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer YOUR_TOKEN_HERE", // Add token if required
        },
      });

      const result = await response.json();
      if (response.ok) {
        setFiles([
          ...files,
          {
            id: files.length + 1,
            name: fileInput.files[0].name,
            uploadedAt: new Date().toISOString().split("T")[0],
            size: `${(fileInput.files[0].size / (1024 * 1024)).toFixed(1)} MB`,
          },
        ]);
        alert("File uploaded successfully");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error uploading file");
    }
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">File Management</h1>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select File</label>
            <input type="file" name="file" required accept=".xlsx, .xls" className="input-field" />
          </div>

          <button type="submit" className="btn-primary">Upload File</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">File List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{file.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{file.uploadedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Files;
