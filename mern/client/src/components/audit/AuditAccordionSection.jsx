import { useState } from 'react';

const AuditAccordionSection = ({ title, status, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to determine if a course item is completed based on grade
  const isCourseCompleted = (item) => {
    if (!item || typeof item !== 'string') return false;
    
    // Skip non-course items
    if (item.includes('NEEDS:') || item.includes('Available:')) return false;
    
    // Look for grade pattern in parentheses: (TERM, GRADE)
    const gradeMatch = item.match(/\([^,)]+,\s*([^)]+)\)$/);
    if (!gradeMatch) return false;
    
    const grade = gradeMatch[1].trim().toLowerCase();
    
    // Course is NOT completed if grade is NR, WIP, or contains "progress"
    if (!grade || 
        grade === '' || 
        grade === 'nr' || 
        grade === 'wip' ||
        grade.includes('wip') ||
        grade.includes('progress')) {
      return false;
    }
    
    // Course is completed if it has any other non-empty grade (A, B+, C, etc.)
    return true;
  };


  return (
    <div className={`rounded-lg overflow-hidden ${
      status === 'fulfilled' 
        ? 'bg-green-100 border border-green-200' 
        : 'border border-gray-200 bg-white'
    }`}>
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            {/* Toggle Icon */}
            <span className="text-gray-400 text-sm flex-shrink-0">
              {isExpanded ? '▼' : '▶'}
            </span>
            
            {/* Completed Checkmark */}
            {status === 'fulfilled' && (
              <span className="text-green-600 font-bold text-sm flex-shrink-0">✓</span>
            )}
            
            {/* Section Title */}
            <h3 className={`text-sm font-medium truncate ${
              status === 'fulfilled' ? 'text-green-800' : 'text-gray-900'
            }`}>
              {title}
            </h3>
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-3 pb-3 bg-gray-50 border-t border-gray-200">
          <div className="space-y-2 pt-3">
            {items.length > 0 ? (
              items.map((item, index) => {
                const isCompleted = isCourseCompleted(item);
                return (
                  <div
                    key={index}
                    className={`rounded border px-3 py-2 ${
                      isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <p className={`text-xs leading-relaxed ${
                      isCompleted 
                        ? 'text-green-800' 
                        : 'text-gray-700'
                    }`}>
                      {isCompleted && (
                        <span className="mr-2 text-green-600 font-bold">✓</span>
                      )}
                      {item}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="text-xs">No courses found</p>
              </div>
            )}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default AuditAccordionSection;