import React, { useState } from "react";
import RightSidebar from "./right-sidebar/RightSidebar";
import LeftSidebar from "./LeftSidebar";
import CoursePlannerContainer from "./planner/CoursePlannerContainer"; // use existing planner
import Header from "./Header";
import WelcomePopup from "./WelcomePopup";



const MainLayout = () => {
  const [currentPage, setCurrentPage] = useState("planner");
  
  // State for parsed degree audit data
  const [parsedCourseData, setParsedCourseData] = useState({
    sections: [],
    metadata: {}
  });

  const pageTitles = {
    planner: "Triton Planner - Plan Your Future at UCSD",
  };  

  const renderPage = () => {
    switch (currentPage) {
      case "planner":
        return <CoursePlannerContainer parsedCourseData={parsedCourseData} />;

      default:
        return <CoursePlannerContainer parsedCourseData={parsedCourseData} />;
    }
  };

  return (
    <div className="flex h-screen">
      <LeftSidebar 
        onParsedDataUpdate={setParsedCourseData}
      />

      {/* Main Panel: header + content + right sidebar */}
      
      <div className="flex flex-col flex-grow overflow-hidden">
        <Header currentPage={pageTitles[currentPage] || "Blueprint"} />

        <div className="flex flex-1 overflow-hidden">
          {/* Main content area */}
          <div className="flex-grow p-6 overflow-y-auto">
            {renderPage()}
          </div>

          {/* Right sidebar with course search & assistant */}
          <RightSidebar />

        </div>
      </div>

      {/* Welcome Popup - appears on first visit */}
      <WelcomePopup />
    </div>
  );
};

export default MainLayout;
