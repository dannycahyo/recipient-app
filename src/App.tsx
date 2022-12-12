import React from "react";
import RecipientForm from "./component/RecipientForm";

function App() {
  return (
    <div className="container mx-auto py-6">
      <div className="md:grid md:grid-cols-4 lg:grid-cols-3 gap-10">
        <div className="md:col-span-2 lg:col-span-1">
          <RecipientForm />
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 lg:col-span-2">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              List Recipients
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
