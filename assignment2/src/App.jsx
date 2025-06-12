import React, { useState } from 'react';

// Mock database for folder structure
const folderData = {
  name: "My Computer",
  type: "folder",
  children: [
    {
      name: "Local Disk (C:)",
      type: "folder",
      children: [
        {
          name: "Program Files",
          type: "folder",
          children: [
            { name: "NodeJS", type: "folder" },
            { name: "Python", type: "folder" }
          ]
        },
        {
          name: "Users",
          type: "folder",
          children: [
            { name: "Documents", type: "folder" },
            { name: "Downloads", type: "folder" }
          ]
        },
        {
          name: "Windows",
          type: "folder",
          children: [
            { name: "System32", type: "folder" },
            { name: "Fonts", type: "folder" }
          ]
        }
      ]
    },
    {
      name: "Local Disk (D:)",
      type: "folder",
      children: [
        {
          name: "Projects",
          type: "folder",
          children: [
            { name: "Web", type: "folder" },
            { name: "Mobile", type: "folder" }
          ]
        },
        { name: "Backup", type: "folder" }
      ]
    }
  ]
};

const Folder = ({ folder, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div 
        onClick={toggleExpand} 
        style={{ 
          cursor: 'pointer', 
          fontWeight: 'bold',
          padding: '5px',
          backgroundColor: level === 0 ? '#f0f0f0' : 'transparent'
        }}
      >
        {folder.children ? (
          <span>{isExpanded ? '📂' : '📁'}</span>
        ) : (
          <span>📄</span>
        )}
        {folder.name}
      </div>
      {isExpanded && folder.children && (
        <div>
          {folder.children.map((child, index) => (
            <Folder key={index} folder={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2>Folder Traversal System</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <Folder folder={folderData} />
      </div>
    </div>
  );
};

export default App;