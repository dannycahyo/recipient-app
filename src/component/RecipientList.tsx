import useRecipient from "../hooks/useRecipient";

const RecipientList = () => {
  const { recipients } = useRecipient();

  console.log(recipients, "TEST");
  return (
    <div className="px-4 sm:px-0">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        List Recipients
      </h3>
    </div>
  );
};

export default RecipientList;
