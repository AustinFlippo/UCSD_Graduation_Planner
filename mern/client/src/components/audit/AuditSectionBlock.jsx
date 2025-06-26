// Component for displaying audit sections in block format

const AuditSectionBlock = ({ title, status, items }) => {
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
    <div className={`rounded-lg p-6 mb-4 shadow-sm ${
      status === 'fulfilled' 
        ? 'bg-green-100 border-2 border-green-200' 
        : 'bg-white border-2 border-gray-200'
    }`}>
      {/* Section Header */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          {status === 'fulfilled' && (
            <span className="text-green-600 font-bold text-lg">✓</span>
          )}
          <h3 className={`text-xl font-bold ${
            status === 'fulfilled' ? 'text-green-800' : 'text-gray-900'
          }`}>
            {title}
          </h3>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-2">
        {items.map((item, index) => {
          const isCompleted = isCourseCompleted(item);
          return (
            <div 
              key={index}
              className={`p-3 rounded text-sm ${
                isCompleted 
                  ? 'bg-green-100 border border-green-200 text-green-800' 
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              {isCompleted && (
                <span className="mr-2 text-green-600 font-bold">✓</span>
              )}
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuditSectionBlock;