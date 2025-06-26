import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

interface FolderProps {
  folder: IFolder;
  level?: number;
  allFolders: IFolder[];
}

interface IFolder {
  _id: string;
  name: string;
  type: 'folder' | 'file';
  parentId: string | null;
  path: string;
}

const Folder: React.FC<FolderProps> = ({ folder, level = 0, allFolders }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const children = allFolders.filter((f) => f.parentId === folder._id);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div
        onClick={children.length ? toggleExpand : undefined}
        style={{
          cursor: children.length ? "pointer" : "default",
          fontWeight: "bold",
          padding: "5px",
          backgroundColor: level === 0 ? "#f0f0f0" : "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {children.length ? (
          <span style={{ marginRight: "5px" }}>{isExpanded ? "📂" : "📁"}</span>
        ) : (
          <span style={{ marginRight: "5px" }}>📄</span>
        )}
        {folder.name}
      </div>
      {isExpanded && children.length > 0 && (
        <div>
          {children.map((child) => (
            <Folder
              key={child._id}
              folder={child}
              level={level + 1}
              allFolders={allFolders}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [allFolders, setAllFolders] = useState<IFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get<IFolder[]>(`${BASE_URL}/api/folders`);
        setAllFolders(response.data);
      } catch (err) {
        setError("Failed to load folders");
        console.error("Error fetching folders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const rootFolders = allFolders.filter((folder) => folder.parentId === null);

  if (isLoading) {
    return <div>Loading folders...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>Folder Traversal System</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {rootFolders.map((folder) => (
          <Folder
            key={folder._id}
            folder={folder}
            level={0}
            allFolders={allFolders}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
