import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TreeNodeProps {
  node: FamilyNode;
  path?: number[];
}

interface FamilyNode {
  name: string;
  details: string;
  children: FamilyNode[];
}

const FamilyTree = () => {
  const [title, setTitle] = useState("Family Tree");
  const [familyData, /* setFamilyData */] = useState<FamilyNode>({
    name: "Grandparent",
    details: "Born 1940 in Paris\nOccupation: Teacher",
    children: [
      {
        name: "Parent 1",
        details: "Born 1965 in Lyon\nOccupation: Doctor",
        children: [
          {
            name: "Child 1",
            details: "Born 1990\nOccupation: Engineer",
            children: []
          }
        ]
      }
    ]
  });

  const TreeNode: React.FC<TreeNodeProps> = ({ node, path = [] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    return (
      <div className="ml-4">
        <div className="flex items-center p-2 my-1 bg-white rounded-lg shadow-sm border border-gray-200">
          <div 
            className="mr-2 cursor-pointer touch-manipulation"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {node.children.length > 0 && (
              isExpanded ? 
                <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <div
              contentEditable
              suppressContentEditableWarning
              className="font-medium outline-none border-b border-transparent hover:border-gray-300 focus:border-blue-300"
              onBlur={() => {
                // const newData = {...node, name: e.target.innerText};
                // Uncomment and use setFamilyData if needed
              }}
            >
              {node.name}
            </div>
            {showDetails && (
              <div
                contentEditable
                suppressContentEditableWarning
                className="mt-2 text-sm text-gray-600 whitespace-pre-line outline-none border-b border-transparent hover:border-gray-300 focus:border-blue-300"
              >
                {node.details}
              </div>
            )}
          </div>
          <button 
            className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 touch-manipulation"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide" : "Details"}
          </button>
        </div>
        {isExpanded && node.children.map((child: FamilyNode, index: number) => (
          <TreeNode 
            key={index} 
            node={child} 
            path={[...path, index]} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 
        className="text-xl font-bold mb-4 outline-none border-b border-transparent hover:border-gray-300 focus:border-blue-300"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setTitle(e.target.innerText)}
      >
        {title}
      </h1>
      <TreeNode node={familyData} />
    </div>
  );
};

export default FamilyTree;
