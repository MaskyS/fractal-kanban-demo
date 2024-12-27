import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft, ArrowLeftRight, ArrowDownUp } from 'lucide-react';
import './App.css'

const WidthContext = createContext({
  registerWidthNeeded: () => { },
  unregisterWidthNeeded: () => { },
});

const CardContext = createContext({ depth: 0 });

// const sampleKanbanData = {
//   columns: [
//     {
//       id: 'q1',
//       title: 'Q1 2024',
//       cards: [
//         {
//           id: 'jan',
//           title: 'January',
//           description: '',
//           hasNested: true,
//           nestedBoard: {
//             columns: [
//               {
//                 id: 'jan-w1',
//                 title: 'Week 1',
//                 cards: [
//                   {
//                     id: 'jan-w1-d1',
//                     title: 'Monday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'jan-w1-d1-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task1', title: '9:00 - Team Sync', description: '', hasNested: false },
//                             { id: 'task2', title: '10:00 - Design Review', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'jan-w1-d1-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task3', title: '14:00 - Meeting', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     id: 'jan-w1-d2',
//                     title: 'Tuesday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'jan-w1-d2-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task4', title: '9:30 - Planning', description: '', hasNested: false },
//                             { id: 'task5', title: '11:00 - Review', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'jan-w1-d2-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task6', title: '13:00 - Discussion', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     id: 'jan-w1-d3',
//                     title: 'Wednesday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'jan-w1-d3-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task7', title: '9:00 - Sync', description: '', hasNested: false },
//                             { id: 'task8', title: '10:30 - Workshop', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'jan-w1-d3-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task9', title: '14:00 - Session', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     id: 'jan-w1-d4',
//                     title: 'Thursday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'jan-w1-d4-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task10', title: '9:15 - Meeting', description: '', hasNested: false },
//                             { id: 'task11', title: '11:00 - Training', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'jan-w1-d4-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task12', title: '13:30 - Consultation', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   },
//                   {
//                     id: 'jan-w1-d5',
//                     title: 'Friday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'jan-w1-d5-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task13', title: '9:00 - Update', description: '', hasNested: false },
//                             { id: 'task14', title: '10:45 - Review', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'jan-w1-d5-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task15', title: '14:00 - Wrap-up', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               },
//               {
//                 id: 'jan-w2',
//                 title: 'Week 2',
//                 cards: [
//                   {
//                     id: 'jan-w2-d1',
//                     title: 'Monday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'jan-w2-d1-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task16', title: '10:00 - Strategy', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'jan-w2-d1-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task17', title: '14:00 - Presentation', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               },
//               {
//                 id: 'jan-w3',
//                 title: 'Week 3',
//                 cards: [
//                   {
//                     id: 'jan-w3-d1',
//                     title: 'Monday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'jan-w3-d1-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task18', title: '9:30 - Planning', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'jan-w3-d1-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task19', title: '14:00 - Review', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               },
//               {
//                 id: 'jan-w4',
//                 title: 'Week 4',
//                 cards: [
//                   {
//                     id: 'jan-w4-d1',
//                     title: 'Monday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'jan-w4-d1-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task20', title: '10:00 - Retrospective', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'jan-w4-d1-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task21', title: '14:00 - Planning', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             ]
//           }
//         },
//         {
//           id: 'feb',
//           title: 'February',
//           description: '',
//           hasNested: true,
//           nestedBoard: {
//             columns: [
//               {
//                 id: 'feb-w1',
//                 title: 'Week 1',
//                 cards: [
//                   {
//                     id: 'feb-w1-d1',
//                     title: 'Monday',
//                     description: '',
//                     hasNested: true,
//                     nestedBoard: {
//                       columns: [
//                         {
//                           id: 'feb-w1-d1-morning',
//                           title: 'Morning',
//                           cards: [
//                             { id: 'task22', title: '9:00 - Review', description: '', hasNested: false }
//                           ]
//                         },
//                         {
//                           id: 'feb-w1-d1-afternoon',
//                           title: 'Afternoon',
//                           cards: [
//                             { id: 'task23', title: '14:00 - Meeting', description: '', hasNested: false }
//                           ]
//                         }
//                       ]
//                     }
//                   }
//                 ]
//               }
//             ]
//           }
//         },
//         {
//           id: 'mar',
//           title: 'March',
//           description: '',
//           hasNested: false,
//           cards: [
//             { id: 'mar-task1', title: 'Quarter End Task', description: '', hasNested: false }
//           ]
//         }
//       ]
//     },
//     {
//       id: 'q2',
//       title: 'Q2 2024',
//       cards: [
//         {
//           id: 'apr',
//           title: 'April',
//           description: '',
//           hasNested: false,
//           cards: [
//             { id: 'apr-task1', title: 'Quarterly Goals', description: '', hasNested: false }
//           ]
//         },
//         {
//           id: 'may',
//           title: 'May',
//           description: '',
//           hasNested: false,
//           cards: [
//             { id: 'may-task1', title: 'Mid-Quarter Review', description: '', hasNested: false }
//           ]
//         },
//         {
//           id: 'jun',
//           title: 'June',
//           description: '',
//           hasNested: false,
//           cards: [
//             { id: 'jun-task1', title: 'Quarter Closing', description: '', hasNested: false }
//           ]
//         }
//       ]
//     },
//     {
//       id: 'q3',
//       title: 'Q3 2024',
//       cards: [
//         {
//           id: 'jul',
//           title: 'July',
//           description: '',
//           hasNested: false,
//           cards: [
//             { id: 'jul-task1', title: 'Summer Planning', description: '', hasNested: false }
//           ]
//         },
//         {
//           id: 'aug',
//           title: 'August',
//           description: '',
//           hasNested: false,
//           cards: [
//             { id: 'aug-task1', title: 'Quarterly Check-in', description: '', hasNested: false }
//           ]
//         },
//         {
//           id: 'sep',
//           title: 'September',
//           description: '',
//           hasNested: false,
//           cards: [
//             { id: 'sep-task1', title: 'Quarter End', description: '', hasNested: false }
//           ]
//         }
//       ]
//     }
//   ]
// };
const sampleKanbanData = {
  columns: [
    {
      id: 'phase1',
      title: 'Phase 1: Research & Planning',
      cards: [
        {
          id: 'task1',
          title: 'Market Research',
          description: '',
          hasNested: true,
          nestedBoard: {
            columns: [
              {
                id: 'subtask1',
                title: 'User Interviews',
                cards: [
                  {
                    id: 'interview1',
                    title: 'Interview Set 1',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                      columns: [
                        {
                          id: 'detail1',
                          title: 'Preparation',
                          cards: [
                            { id: 'prep1', title: 'Define Interview Questions', description: '', hasNested: false },
                            { id: 'prep2', title: 'Select Participants', description: '', hasNested: false }
                          ]
                        },
                        {
                          id: 'detail2',
                          title: 'Execution',
                          cards: [
                            { id: 'exec1', title: 'Conduct Interviews', description: '', hasNested: false }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    id: 'interview2',
                    title: 'Interview Set 2',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                      columns: [
                        {
                          id: 'detail3',
                          title: 'Preparation',
                          cards: [
                            { id: 'prep3', title: 'Update Questions', description: '', hasNested: false }
                          ]
                        },
                        {
                          id: 'detail4',
                          title: 'Execution',
                          cards: [
                            { id: 'exec2', title: 'Conduct Follow-up Interviews', description: '', hasNested: false }
                          ]
                        }
                      ]
                    }
                  }
                ]
              },
              {
                id: 'subtask2',
                title: 'Competitor Analysis',
                cards: [
                  {
                    id: 'analysis1',
                    title: 'Identify Competitors',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                      columns: [
                        {
                          id: 'detail5',
                          title: 'Online Research',
                          cards: [
                            { id: 'research1', title: 'List Top Competitors', description: '', hasNested: false },
                            { id: 'research2', title: 'Gather Product Info', description: '', hasNested: false }
                          ]
                        }
                      ]
                    }
                  }
                ]
              },
              {
                id: 'subtask3',
                title: 'SWOT Analysis',
                cards: [
                  {
                    id: 'swot1',
                    title: 'Strengths & Weaknesses',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                      columns: [
                        {
                          id: 'detail6',
                          title: 'Internal Analysis',
                          cards: [
                            { id: 'analysis2', title: 'List Strengths', description: '', hasNested: false },
                            { id: 'analysis3', title: 'List Weaknesses', description: '', hasNested: false }
                          ]
                        }
                      ]
                    }
                  }
                ]
              },
              {
                id: 'subtask4',
                title: 'Market Trends',
                cards: [
                  {
                    id: 'trend1',
                    title: 'Industry Reports',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                      columns: [
                        {
                          id: 'detail7',
                          title: 'Data Collection',
                          cards: [
                            { id: 'data1', title: 'Collect Reports', description: '', hasNested: false }
                          ]
                        },
                        {
                          id: 'detail8',
                          title: 'Data Analysis',
                          cards: [
                            { id: 'data2', title: 'Analyze Trends', description: '', hasNested: false }
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
          id: 'task2',
          title: 'Requirement Gathering',
          description: '',
          hasNested: true,
          nestedBoard: {
            columns: [
              {
                id: 'subtask5',
                title: 'Stakeholder Meetings',
                cards: [
                  {
                    id: 'meeting1',
                    title: 'Initial Meeting',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                      columns: [
                        {
                          id: 'detail9',
                          title: 'Preparation',
                          cards: [
                            { id: 'prep4', title: 'Prepare Agenda', description: '', hasNested: false },
                            { id: 'prep5', title: 'Send Invitations', description: '', hasNested: false }
                          ]
                        },
                        {
                          id: 'detail10',
                          title: 'Discussion',
                          cards: [
                            { id: 'discuss1', title: 'Gather Requirements', description: '', hasNested: false }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    id: 'meeting2',
                    title: 'Follow-up Meeting',
                    description: '',
                    hasNested: true,
                    nestedBoard: {
                      columns: [
                        {
                          id: 'detail11',
                          title: 'Review Notes',
                          cards: [
                            { id: 'review1', title: 'Summarize Initial Meeting', description: '', hasNested: false }
                          ]
                        },
                        {
                          id: 'detail12',
                          title: 'Clarifications',
                          cards: [
                            { id: 'clarify1', title: 'Address Open Questions', description: '', hasNested: false }
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
          id: 'task3',
          title: 'Prototyping',
          description: '',
          hasNested: false,
          cards: [
            { id: 'proto1', title: 'Design Wireframes', description: '', hasNested: false },
            { id: 'proto2', title: 'Develop Clickable Prototype', description: '', hasNested: false }
          ]
        }
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Development',
      cards: [
        {
          id: 'task4',
          title: 'Frontend Development',
          description: '',
          hasNested: false,
          cards: [
            { id: 'frontend1', title: 'Implement UI Components', description: '', hasNested: false },
            { id: 'frontend2', title: 'Integrate APIs', description: '', hasNested: false }
          ]
        },
        {
          id: 'task5',
          title: 'Backend Development',
          description: '',
          hasNested: false,
          cards: [
            { id: 'backend1', title: 'Set Up Database', description: '', hasNested: false },
            { id: 'backend2', title: 'Develop API Endpoints', description: '', hasNested: false }
          ]
        },
        {
          id: 'task6',
          title: 'Testing',
          description: '',
          hasNested: false,
          cards: [
            { id: 'testing1', title: 'Unit Testing', description: '', hasNested: false },
            { id: 'testing2', title: 'Integration Testing', description: '', hasNested: false }
          ]
        }
      ]
    },
    {
      id: 'phase3',
      title: 'Phase 3: Launch & Post-Launch',
      cards: [
        {
          id: 'task7',
          title: 'Marketing Campaign',
          description: '',
          hasNested: false,
          cards: [
            { id: 'marketing1', title: 'Social Media Marketing', description: '', hasNested: false },
            { id: 'marketing2', title: 'Content Creation', description: '', hasNested: false }
          ]
        },
        {
          id: 'task8',
          title: 'App Deployment',
          description: '',
          hasNested: false,
          cards: [
            { id: 'deployment1', title: 'App Store Submission', description: '', hasNested: false },
            { id: 'deployment2', title: 'Beta Testing', description: '', hasNested: false }
          ]
        },
        {
          id: 'task9',
          title: 'Post-Launch Support',
          description: '',
          hasNested: false,
          cards: [
            { id: 'support1', title: 'Bug Fixes', description: '', hasNested: false },
            { id: 'support2', title: 'User Feedback Analysis', description: '', hasNested: false }
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
          w-4 h-4 transition-all duration-300
          ${isExpanded ? 'rotate-180 text-blue-500 fill-blue-500' : ''} 
          ${isHovered && !isExpanded ? 'text-gray-700' : ''}
        `} />
      ) : (
        isExpanded ?
          <ChevronLeft className="w-4 h-4 text-blue-500 fill-blue-500" /> :
          <ChevronRight className={`w-4 h-4 ${isHovered ? 'text-gray-700' : ''}`} />
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
    // depth % 2 === 1; 
    false;

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
        // <div 
        //   className={`
        //     transition-all duration-300 ease-in-out overflow-hidden
        //     ${isHorizontal ? 'border-l border-gray-200' : 'border-t border-gray-200 mt-2'}
        //     ${isHovered || isExpanded ? 
        //       (isHorizontal ? 'w-[48rem] opacity-100' : 'max-h-96 opacity-100')
        //       : 
        //       (isHorizontal ? 'w-0 opacity-0' : 'max-h-0 opacity-0')
        //     }
        //   `}
        // >
        <div
          className={`
    transition-all duration-300 ease-in-out
    ${isHorizontal ? 'border-l border-gray-200' : 'border-t border-gray-200 mt-2'}
    ${isHovered || isExpanded ?
              (isHorizontal ? 'w-[48rem] opacity-100 overflow-auto' : 'max-h-96 opacity-100 overflow-y-auto')
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