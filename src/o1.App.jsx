const Card = ({ card, columnId }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [overrideDirection, setOverrideDirection] = useState(null);
    const { registerWidthNeeded, unregisterWidthNeeded } = useContext(WidthContext);
    const { depth } = useContext(CardContext);
    
    const isHorizontal = overrideDirection ? 
      overrideDirection === 'horizontal' : 
      depth % 2 === 1;
  
    useEffect(() => {
      if ((isExpanded || isHovered) && card.hasNested) {
        registerWidthNeeded(columnId);
      } else {
        unregisterWidthNeeded(columnId);
      }
    }, [isExpanded, isHovered, columnId, card.hasNested]);
  
    const handleDirectionChange = () => {
      setOverrideDirection(
        overrideDirection === 'horizontal' ? 'vertical' :
        overrideDirection === 'vertical' ? null :
        'horizontal'
      );
    };
  
    return (
      <div 
        className={`
          bg-white rounded-lg shadow-sm border border-gray-200
          ${isHorizontal ? 'flex' : 'block'}
          transition-all duration-300 ease-in-out
        `}
        onMouseEnter={() => card.hasNested && setIsHovered(true)}
        onMouseLeave={() => card.hasNested && setIsHovered(false)}
      >
        <div className="w-64 flex-shrink-0 p-4">
          <div className="flex items-center gap-2">
            {card.hasNested && !isHorizontal && (
              <CardControls 
                isHorizontal={isHorizontal}
                isExpanded={isExpanded}
                isHovered={isHovered}
                overrideDirection={overrideDirection}
                onExpand={() => setIsExpanded(!isExpanded)}
                onDirectionChange={handleDirectionChange}
              />
            )}
            <h3 className="font-medium truncate">{card.title}</h3>
            {card.hasNested && isHorizontal && (
              <CardControls 
                isHorizontal={isHorizontal}
                isExpanded={isExpanded}
                isHovered={isHovered}
                overrideDirection={overrideDirection}
                onExpand={() => setIsExpanded(!isExpanded)}
                onDirectionChange={handleDirectionChange}
              />
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">{card.description}</p>
        </div>
        
        {card.hasNested && (
          <div 
            className={`
              transition-all duration-300 ease-in-out
              ${isHorizontal ? 'border-l border-gray-200' : 'border-t border-gray-200 mt-2'}
              ${isHovered || isExpanded ? 
                (isHorizontal ? 'w-[48rem] opacity-100 overflow-x-auto' : 'max-h-96 opacity-100 overflow-y-auto')
                : 
                (isHorizontal ? 'w-0 opacity-0 overflow-hidden' : 'max-h-0 opacity-0 overflow-hidden')
              }
            `}
          >
            <div className={`
              ${isHorizontal ? 'h-full' : 'mt-2'} 
              bg-gray-50 
              ${isHorizontal ? '' : 'p-2'} 
              rounded
            `}>
              <CardContext.Provider value={{ depth: depth + 1 }}>
                <KanbanBoard data={card.nestedBoard} />
              </CardContext.Provider>
            </div>
          </div>
        )}
      </div>
    );
  };

  
  
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft, ArrowLeftRight, ArrowDownUp } from 'lucide-react';
import './App.css';

const WidthContext = createContext({
    registerWidthNeeded: () => { },
    unregisterWidthNeeded: () => { },
});

const CardContext = createContext({ depth: 0 });
const sampleKanbanData = {
    columns: [
        {
            id: 'q1',
            title: 'Q1 2024',
            cards: [
                {
                    id: 'jan',
                    title: 'January',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                        columns: [
                            {
                                id: 'jan-w1',
                                title: 'Week 1',
                                cards: [
                                    {
                                        id: 'jan-w1-d1',
                                        title: 'Monday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'jan-w1-d1-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task1', title: '9:00 - Team Sync', description: '', hasNested: false },
                                                        { id: 'task2', title: '10:00 - Design Review', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'jan-w1-d1-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task3', title: '14:00 - Meeting', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        id: 'jan-w1-d2',
                                        title: 'Tuesday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'jan-w1-d2-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task4', title: '9:30 - Planning', description: '', hasNested: false },
                                                        { id: 'task5', title: '11:00 - Review', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'jan-w1-d2-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task6', title: '13:00 - Discussion', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        id: 'jan-w1-d3',
                                        title: 'Wednesday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'jan-w1-d3-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task7', title: '9:00 - Sync', description: '', hasNested: false },
                                                        { id: 'task8', title: '10:30 - Workshop', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'jan-w1-d3-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task9', title: '14:00 - Session', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        id: 'jan-w1-d4',
                                        title: 'Thursday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'jan-w1-d4-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task10', title: '9:15 - Meeting', description: '', hasNested: false },
                                                        { id: 'task11', title: '11:00 - Training', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'jan-w1-d4-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task12', title: '13:30 - Consultation', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        id: 'jan-w1-d5',
                                        title: 'Friday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'jan-w1-d5-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task13', title: '9:00 - Update', description: '', hasNested: false },
                                                        { id: 'task14', title: '10:45 - Review', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'jan-w1-d5-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task15', title: '14:00 - Wrap-up', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                id: 'jan-w2',
                                title: 'Week 2',
                                cards: [
                                    {
                                        id: 'jan-w2-d1',
                                        title: 'Monday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'jan-w2-d1-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task16', title: '10:00 - Strategy', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'jan-w2-d1-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task17', title: '14:00 - Presentation', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                id: 'jan-w3',
                                title: 'Week 3',
                                cards: [
                                    {
                                        id: 'jan-w3-d1',
                                        title: 'Monday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'jan-w3-d1-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task18', title: '9:30 - Planning', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'jan-w3-d1-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task19', title: '14:00 - Review', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                id: 'jan-w4',
                                title: 'Week 4',
                                cards: [
                                    {
                                        id: 'jan-w4-d1',
                                        title: 'Monday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'jan-w4-d1-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task20', title: '10:00 - Retrospective', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'jan-w4-d1-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task21', title: '14:00 - Planning', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    id: 'feb',
                    title: 'February',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                        columns: [
                            {
                                id: 'feb-w1',
                                title: 'Week 1',
                                cards: [
                                    {
                                        id: 'feb-w1-d1',
                                        title: 'Monday',
                                        description: '',
                                        hasNested: true,
                                        nestedBoard: {
                                            columns: [
                                                {
                                                    id: 'feb-w1-d1-morning',
                                                    title: 'Morning',
                                                    cards: [
                                                        { id: 'task22', title: '9:00 - Review', description: '', hasNested: false }
                                                    ]
                                                },
                                                {
                                                    id: 'feb-w1-d1-afternoon',
                                                    title: 'Afternoon',
                                                    cards: [
                                                        { id: 'task23', title: '14:00 - Meeting', description: '', hasNested: false }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    id: 'mar',
                    title: 'March',
                    description: '',
                    hasNested: false,
                    cards: [
                        { id: 'mar-task1', title: 'Quarter End Task', description: '', hasNested: false }
                    ]
                }
            ]
        },
        {
            id: 'q2',
            title: 'Q2 2024',
            cards: [
                {
                    id: 'apr',
                    title: 'April',
                    description: '',
                    hasNested: false,
                    cards: [
                        { id: 'apr-task1', title: 'Quarterly Goals', description: '', hasNested: false }
                    ]
                },
                {
                    id: 'may',
                    title: 'May',
                    description: '',
                    hasNested: false,
                    cards: [
                        { id: 'may-task1', title: 'Mid-Quarter Review', description: '', hasNested: false }
                    ]
                },
                {
                    id: 'jun',
                    title: 'June',
                    description: '',
                    hasNested: false,
                    cards: [
                        { id: 'jun-task1', title: 'Quarter Closing', description: '', hasNested: false }
                    ]
                }
            ]
        },
        {
            id: 'q3',
            title: 'Q3 2024',
            cards: [
                {
                    id: 'jul',
                    title: 'July',
                    description: '',
                    hasNested: false,
                    cards: [
                        { id: 'jul-task1', title: 'Summer Planning', description: '', hasNested: false }
                    ]
                },
                {
                    id: 'aug',
                    title: 'August',
                    description: '',
                    hasNested: false,
                    cards: [
                        { id: 'aug-task1', title: 'Quarterly Check-in', description: '', hasNested: false }
                    ]
                },
                {
                    id: 'sep',
                    title: 'September',
                    description: '',
                    hasNested: false,
                    cards: [
                        { id: 'sep-task1', title: 'Quarter End', description: '', hasNested: false }
                    ]
                }
            ]
        }
    ]
};

const CardControls = ({ isHorizontal, isExpanded, isHovered, overrideDirection, onExpand, onDirectionChange }) => (
    <div className="flex items-center gap-1">
        <button
            onClick={onExpand}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700"
        >
            {!isHorizontal ? (
                <ChevronDown className={`
          w-4 h-4 transition-transform duration-300
          ${isExpanded ? 'rotate-180 text-blue-500 fill-blue-500' : ''}
          ${isHovered && !isExpanded ? 'text-gray-700' : ''}
        `} />
            ) : (
                isExpanded ?
                    <ChevronLeft className="w-4 h-4 text-blue-500 fill-blue-500" /> :
                    <ChevronRight className={`w-4 h-4 transition-colors duration-300 ${isHovered ? 'text-gray-700' : ''}`} />
            )}
        </button>
        <button
            onClick={onDirectionChange}
            className={`
        flex-shrink-0 opacity-0 transition-opacity duration-200
        ${isHovered ? 'opacity-100' : ''}
        ${overrideDirection ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}
      `}
        >
            {isHorizontal ?
                <ArrowDownUp className="w-3 h-3" /> :
                <ArrowLeftRight className="w-3 h-3" />
            }
        </button>
    </div>
);

const Card = ({ card, columnId }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [overrideDirection, setOverrideDirection] = useState(null);
    const { registerWidthNeeded, unregisterWidthNeeded } = useContext(WidthContext);
    const { depth } = useContext(CardContext);

    const isHorizontal = overrideDirection ?
        overrideDirection === 'horizontal' :
        depth % 2 === 1;

    // Reference to the collapsible content for dynamic height calculation
    const collapsibleRef = useRef(null);
    const [collapsibleHeight, setCollapsibleHeight] = useState('0px'); // Initial height

    useEffect(() => {
        if ((isExpanded || isHovered) && card.hasNested) {
            registerWidthNeeded(columnId);
            if (collapsibleRef.current) {
                setCollapsibleHeight(`${collapsibleRef.current.scrollHeight}px`);
            }
        } else {
            unregisterWidthNeeded(columnId);
            setCollapsibleHeight('0px');
        }
    }, [isExpanded, isHovered, columnId, card.hasNested, registerWidthNeeded, unregisterWidthNeeded]);

    const handleDirectionChange = () => {
        setOverrideDirection(
            overrideDirection === 'horizontal' ? 'vertical' :
                overrideDirection === 'vertical' ? null :
                    'horizontal'
        );
    };

    return (
        <div
            className={`
        bg-white rounded-lg shadow-sm border border-gray-200
        ${isHorizontal ? 'flex' : 'block'}
        transition-all duration-300 ease-in-out
      `}
            onMouseEnter={() => card.hasNested && setIsHovered(true)}
            onMouseLeave={() => card.hasNested && setIsHovered(false)}
        >
            <div className="w-64 flex-shrink-0 p-4">
                <div className="flex items-center gap-2">
                    {card.hasNested && !isHorizontal && (
                        <CardControls
                            isHorizontal={isHorizontal}
                            isExpanded={isExpanded}
                            isHovered={isHovered}
                            overrideDirection={overrideDirection}
                            onExpand={() => setIsExpanded(!isExpanded)}
                            onDirectionChange={handleDirectionChange}
                        />
                    )}
                    <h3 className="font-medium truncate">{card.title}</h3>
                    {card.hasNested && isHorizontal && (
                        <CardControls
                            isHorizontal={isHorizontal}
                            isExpanded={isExpanded}
                            isHovered={isHovered}
                            overrideDirection={overrideDirection}
                            onExpand={() => setIsExpanded(!isExpanded)}
                            onDirectionChange={handleDirectionChange}
                        />
                    )}
                </div>
                <p className="text-sm text-gray-600 truncate">{card.description}</p>
            </div>

            {card.hasNested && (
                <div
                    className={`
            transition-all duration-300 ease-in-out
            ${isHorizontal ? 'border-l border-gray-200' : 'border-t border-gray-200 mt-2'}
            ${isHorizontal ? 'w-[48rem]' : 'w-full'}
          `}
                    style={{
                        height: isHorizontal
                            ? (isExpanded || isHovered ? 'auto' : '0px')
                            : collapsibleHeight,
                        opacity: isHorizontal
                            ? (isExpanded || isHovered ? '1' : '0')
                            : (isExpanded || isHovered ? '1' : '0'),
                        overflow: isHorizontal
                            ? 'hidden'
                            : (isExpanded || isHovered ? 'hidden' : 'hidden')
                    }}
                >
                    <div className={`
            ${isHorizontal ? 'h-full' : 'mt-2'} 
            bg-gray-50 
            ${isHorizontal ? '' : 'p-2'} 
            rounded
            transition-opacity duration-300 ease-in-out
          `}>
                        {/* Use the ref on this div to measure height */}
                        <div ref={collapsibleRef}>
                            <CardContext.Provider value={{ depth: depth + 1 }}>
                                <KanbanBoard data={card.nestedBoard} />
                            </CardContext.Provider>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Column = ({ column, expansionCount = 0 }) => {
    return (
        <div
            className={`
        flex-shrink-0 bg-gray-100 rounded-lg p-4 mr-4
        transition-all duration-300 ease-in-out
        ${expansionCount > 0 ? 'w-[52rem]' : 'w-64'}
      `}
        >
            <h2 className="font-bold mb-4 truncate">{column.title}</h2>
            <div className="space-y-2">
                {column.cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        columnId={column.id}
                    />
                ))}
            </div>
        </div>
    );
};

const KanbanBoard = ({ data }) => {
    const [expandedColumns, setExpandedColumns] = useState({});

    const widthContext = {
        registerWidthNeeded: (columnId) => {
            setExpandedColumns(prev => ({
                ...prev,
                [columnId]: (prev[columnId] || 0) + 1
            }));
        },
        unregisterWidthNeeded: (columnId) => {
            setExpandedColumns(prev => ({
                ...prev,
                [columnId]: Math.max(0, (prev[columnId] || 0) - 1)
            }));
        }
    };

    return (
        <WidthContext.Provider value={widthContext}>
            <div className="overflow-x-auto">
                <div className="flex p-4 min-w-fit">
                    {data.columns.map(column => (
                        <Column
                            key={column.id}
                            column={column}
                            expansionCount={expandedColumns[column.id] || 0}
                        />
                    ))}
                </div>
            </div>
        </WidthContext.Provider>
    );
};

const FractalKanbanDemo = () => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Fractal Kanban Demo</h2>
            <div className="border rounded shadow-sm">
                <CardContext.Provider value={{ depth: 0 }}>
                    <KanbanBoard data={sampleKanbanData} />
                </CardContext.Provider>
            </div>
        </div>
    );
};

export default FractalKanbanDemo;