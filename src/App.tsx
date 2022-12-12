import RecipientForm from "./component/RecipientForm";
import RecipientList from "./component/RecipientList";

function App() {
  return (
    <div className="container mx-auto py-6">
      <div className="md:grid md:grid-cols-4 lg:grid-cols-3 gap-10">
        <div className="md:col-span-2 lg:col-span-1">
          <RecipientForm />
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0 lg:col-span-2">
          <RecipientList />
        </div>
      </div>
    </div>
  );
}

export default App;
