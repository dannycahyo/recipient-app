import React from "react";
import useRecipient from "../hooks/useRecipient";
import { Recipient } from "../types/recipient";
import { BsSearch, BsFillTrashFill } from "react-icons/bs";

const RecipientList = () => {
  const { recipients, deleteRecipientById } = useRecipient();
  const [searchRecipient, setSearchRecipient] = React.useState<string>("");

  const [selectedRecipients, setSelectedRecipients] = React.useState<string[]>(
    []
  );

  const handleDeleteRecipient = (selectedRecipients: string[]) => {
    selectedRecipients.forEach((recipientId: string) => {
      deleteRecipientById(recipientId);
      setSelectedRecipients((prevRecipients) =>
        prevRecipients.filter((prevRecipient) => prevRecipient !== recipientId)
      );
    });
  };

  const filteredRecipients = recipients?.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchRecipient.toLowerCase()) ||
      recipient.description
        .toLowerCase()
        .includes(searchRecipient.toLowerCase())
  );

  const getTotalTax = (recipients: Recipient[] | undefined) => {
    const totalTax = recipients?.map((recipient) => {
      const calculatedTax = (recipient.amount * recipient.tax) / 100;
      return calculatedTax;
    });

    const result = totalTax?.reduce((acc, curr) => acc + curr);
    return result;
  };

  const getTotalDiscount = (recipients: Recipient[] | undefined) => {
    const totalDiscount = recipients?.map((recipient) => {
      const calculatedDiscount = (recipient.amount * recipient.discount) / 100;
      return calculatedDiscount;
    });

    const result = totalDiscount?.reduce((acc, curr) => acc + curr);
    return result;
  };

  const totalRecipients = filteredRecipients?.length;
  const getTotalAmount = (recipients: Recipient[] | undefined) => {
    const totalAmounts = recipients?.map((recipient) =>
      Number(recipient.amount)
    );
    const result = totalAmounts?.reduce((acc, curr) => acc + curr);
    return result;
  };

  const getTotal = (recipients: Recipient[] | undefined) => {
    const totals = recipients?.map((recipient) => Number(recipient.total));
    const result = totals?.reduce((acc, curr) => acc + curr);
    return result;
  };

  return (
    <div className="px-4 sm:px-0">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        List Recipients
      </h3>

      <div className="mt-2 flex justify-between items-center">
        <div>
          <div className="absolute mt-2 ml-2">
            <BsSearch color="gray" />
          </div>
          <input
            value={searchRecipient}
            onChange={(e) => setSearchRecipient(e.target.value)}
            type="text"
            placeholder="Search recipient"
            className="block w-full h-8 flex-1 rounded-l-md rounded-r-md border-gray-200 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-8"
          />
        </div>

        <div className="pr-6 flex gap-4">
          {selectedRecipients.length !== 0 && (
            <button onClick={() => handleDeleteRecipient(selectedRecipients)}>
              <div className="flex gap-2 justify-center items-center">
                <BsFillTrashFill color="red" />
                <p className="text-red-500 text-sm">{`Delete ${selectedRecipients.length} selected`}</p>
              </div>
            </button>
          )}

          <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Undo
          </button>
          <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Redo
          </button>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3 pl-4">
                        <div className="flex items-center h-5">
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="checkbox" className="sr-only">
                            Checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Tax
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Discount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecipients?.map((recipient) => (
                      <tr key={recipient.id}>
                        <td className="py-3 pl-4">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setSelectedRecipients((prevRecipient) => [
                                    ...prevRecipient,
                                    recipient.id,
                                  ]);
                                } else {
                                  setSelectedRecipients((prevRecipients) =>
                                    prevRecipients.filter(
                                      (prevRecipient) =>
                                        prevRecipient !== recipient.id
                                    )
                                  );
                                }
                              }}
                            />
                            <label htmlFor="checkbox" className="sr-only">
                              Checkbox
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {recipient.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {recipient.description}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {recipient.amount}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {recipient.tax !== 0 ? `${recipient.tax} %` : "-"}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {recipient.discount !== 0
                            ? `${recipient.discount} %`
                            : "-"}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {recipient.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse px-4 py-3">
        <div>
          <div className="flex justify-between gap-10 items-center">
            <p className="text-gray-400 text-sm">Recipient</p>
            <p className="text-gray-400 text-sm">{`${totalRecipients} Recipients`}</p>
          </div>

          <div className="flex justify-between gap-10 items-center">
            <p className="text-sm mt-2 font-bold">Total Tax</p>
            <p className="text-sm">{`Rp ${getTotalTax(filteredRecipients)}`}</p>
          </div>

          <div className="flex justify-between gap-10 items-center">
            <p className="text-sm mt-2 font-bold">Total Discount</p>
            <p className="text-sm">{`Rp ${getTotalDiscount(
              filteredRecipients
            )}`}</p>
          </div>

          <div className="flex justify-between gap-10 items-center">
            <p className="text-sm mt-2 font-bold">Total Amount</p>
            <p className="text-sm">{`Rp ${getTotalAmount(
              filteredRecipients
            )}`}</p>
          </div>

          <div className="flex justify-between gap-10 items-center">
            <p className="text-sm mt-2 font-bold">Total</p>
            <p className="text-sm">{`Rp ${getTotal(filteredRecipients)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientList;
