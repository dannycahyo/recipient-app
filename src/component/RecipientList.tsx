import React from "react";
import useRecipient from "../hooks/useRecipient";
import { Recipient } from "../types/recipient";
import { HStack } from "../uikit/HStack";
import { BsSearch, BsFillTrashFill } from "react-icons/bs";

namespace Caption {
  export const name = "Name";
  export const description = "Description";
  export const amount = "Amount";
  export const tax = "Tax";
  export const discount = "Discount";
  export const recipient = "Recipient";
  export const recipientList = "List Recipients";
  export const totalTax = "Total Tax";
  export const totalDiscount = "Total Discount";
  export const totalAmount = "Total Amount";
  export const total = "Total";
  export const emptyRecipient = "Empty Recipient";
}

const RecipientList = () => {
  const { recipients, deleteRecipientById } = useRecipient();
  const [searchRecipient, setSearchRecipient] = React.useState<string>("");

  const [selectedRecipientsId, setSelectedRecipientsId] = React.useState<
    string[]
  >([]);

  const handleDeleteRecipient = (selectedRecipientsId: string[]) => {
    selectedRecipientsId.forEach((recipientId: string) => {
      deleteRecipientById(recipientId);
      setSelectedRecipientsId((prevRecipients) =>
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
    <div className="px-4 sm:px-0 overflow-x-auto">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        {Caption.recipientList}
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

        <div className="flex gap-2">
          {selectedRecipientsId.length !== 0 && (
            <button onClick={() => handleDeleteRecipient(selectedRecipientsId)}>
              <div className="flex gap-2 justify-center items-center">
                <BsFillTrashFill color="red" />
                <p className="text-red-500 text-sm">{`Delete ${selectedRecipientsId.length} selected`}</p>
              </div>
            </button>
          )}

          <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Undo
          </button>
          <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Redo
          </button>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-x-auto relative border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        {Caption.name}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        {Caption.description}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        {Caption.amount}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        {Caption.tax}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        {Caption.discount}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        {Caption.total}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecipients?.length === 0 ? (
                      <p>{Caption.emptyRecipient}</p>
                    ) : (
                      <>
                        {filteredRecipients?.map((recipient) => (
                          <tr key={recipient.id}>
                            <td className="py-3 pl-4">
                              <div className="flex items-center h-5">
                                <input
                                  type="checkbox"
                                  className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      setSelectedRecipientsId(
                                        (prevRecipient) => [
                                          ...prevRecipient,
                                          recipient.id,
                                        ]
                                      );
                                    } else {
                                      setSelectedRecipientsId(
                                        (prevRecipients) =>
                                          prevRecipients.filter(
                                            (prevRecipient) =>
                                              prevRecipient !== recipient.id
                                          )
                                      );
                                    }
                                  }}
                                />
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
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse px-4 py-3">
        {filteredRecipients?.length !== 0 && recipients !== undefined && (
          <div>
            <div className="flex justify-between gap-10 items-center">
              <p className="text-gray-400 text-sm">{Caption.recipient}</p>
              <p className="text-gray-400 text-sm">{`${totalRecipients} Recipients`}</p>
            </div>

            <HStack>
              <p className="text-sm mt-2 font-bold">{Caption.totalTax}</p>
              <p className="text-sm">{`Rp ${getTotalTax(
                filteredRecipients
              )}`}</p>
            </HStack>

            <HStack>
              <p className="text-sm mt-2 font-bold">{Caption.totalDiscount}</p>
              <p className="text-sm">{`Rp ${getTotalDiscount(
                filteredRecipients
              )}`}</p>
            </HStack>

            <HStack>
              <p className="text-sm mt-2 font-bold">{Caption.totalAmount}</p>
              <p className="text-sm">{`Rp ${getTotalAmount(
                filteredRecipients
              )}`}</p>
            </HStack>

            <HStack>
              <p className="text-sm mt-2 font-bold">{Caption.total}</p>
              <p className="text-sm">{`Rp ${getTotal(filteredRecipients)}`}</p>
            </HStack>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientList;
