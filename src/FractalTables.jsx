import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Enhanced sample data with deeper nesting
const sampleData = {
  headers: ['ID', 'Name', 'Details', 'Extra Info'],
  rows: [
    {
      id: '1',
      cells: [
        { content: '1', hasNested: false },
        { content: 'Item 1', hasNested: false },
        { content: 'Simple text', hasNested: false },
        { content: 'Extra', hasNested: false }
      ]
    },
    {
      id: '2',
      cells: [
        { 
          content: '2',
          hasNested: true,
          nestedTable: {
            headers: ['SubID', 'SubName', 'SubDetails'],
            rows: [
              {
                id: '2.1',
                cells: [
                  { 
                    content: '2.1',
                    hasNested: true,
                    nestedTable: {
                      headers: ['Deep ID', 'Deep Name'],
                      rows: [
                        {
                          id: '2.1.1',
                          cells: [
                            { content: '2.1.1', hasNested: false },
                            { content: 'Deep Layer', hasNested: false }
                          ]
                        }
                      ]
                    }
                  },
                  { content: 'Sub 1', hasNested: false },
                  { content: 'Nested Details', hasNested: false }
                ]
              }
            ]
          }
        },
        { content: 'Item 2', hasNested: false },
        { content: 'Regular cell', hasNested: false },
        { 
          content: 'Another nested',
          hasNested: true,
          nestedTable: {
            headers: ['OtherID', 'OtherInfo'],
            rows: [
              {
                id: '2.side.1',
                cells: [
                  { content: 'Side 1', hasNested: false },
                  { content: 'Side Info', hasNested: false }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

const Table = ({ data, level = 0 }) => {
  const [hoveredCells, setHoveredCells] = useState(new Set());
  const [expandedCells, setExpandedCells] = useState(new Set());

  const toggleCell = (rowId, cellIndex) => {
    const cellKey = `${rowId}-${cellIndex}`;
    const newExpanded = new Set(expandedCells);
    if (newExpanded.has(cellKey)) {
      newExpanded.delete(cellKey);
    } else {
      newExpanded.add(cellKey);
    }
    setExpandedCells(newExpanded);
  };

  const handleMouseEnter = (rowId, cellIndex) => {
    const cellKey = `${rowId}-${cellIndex}`;
    setHoveredCells(new Set([cellKey]));
  };

  const handleMouseLeave = () => {
    setHoveredCells(new Set());
  };

  return (
    <div className={`w-full ${level === 0 ? 'max-h-96' : ''} overflow-auto`}>
      <table className="border-collapse min-w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            {data.headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 p-2 text-left sticky top-0 bg-gray-100 min-w-[200px]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-300">
              {row.cells.map((cell, cellIndex) => {
                const cellKey = `${row.id}-${cellIndex}`;
                const isExpanded = expandedCells.has(cellKey);
                const isHovered = hoveredCells.has(cellKey);

                return (
                  <td 
                    key={cellIndex} 
                    className="border border-gray-300 p-2 relative"
                  >
                    <div 
                      className={`
                        relative 
                        ${cell.hasNested ? 'cursor-pointer' : ''}
                        transition-all duration-300 ease-in-out
                      `}
                      onMouseEnter={() => cell.hasNested && handleMouseEnter(row.id, cellIndex)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center gap-2">
                        {cell.hasNested && (
                          <div className={`
                            transition-transform duration-300
                            ${isHovered || isExpanded ? 'rotate-180' : ''}
                          `}>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                        {cell.content}
                      </div>
                      
                      <div 
                        className={`
                          mt-2 bg-gray-50 border border-gray-200 rounded
                          transition-all duration-300 ease-in-out
                          overflow-hidden
                          ${isHovered || isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}
                        `}
                        onClick={() => toggleCell(row.id, cellIndex)}
                      >
                        {cell.hasNested && (
                          <div className="p-2">
                            <Table data={cell.nestedTable} level={level + 1} />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FractalTableDemo = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Fractal Table Demo</h2>
      <div className="border rounded shadow-sm">
        <Table data={sampleData} />
      </div>
    </div>
  );
};

export default FractalTableDemo;