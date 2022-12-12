import React from "react";
import { Formik, Form, Field } from "formik";
import { RecipientSchema } from "../form-schema/recipientSchema";

namespace Caption {
  export const name = "Name";
  export const description = "Description";
  export const amount = "Amount";
  export const tax = "Tax";
  export const discount = "Discount";
  export const submit = "Submit";
}

const RecipientForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        amount: 0,
        tax: 0,
        discount: 0,
      }}
      validationSchema={RecipientSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2 md:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {Caption.name}
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <Field
                      name="name"
                      className="block w-full h-8 flex-1 rounded-l-md rounded-r-md border-gray-200 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                      placeholder="Type Recipient Name"
                    />
                  </div>

                  {errors.name && touched.name ? (
                    <div>
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    </div>
                  ) : null}

                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mt-2"
                  >
                    {Caption.description}
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <Field
                      name="description"
                      className="block w-full h-8 flex-1 rounded-l-md rounded-r-md border-gray-200 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                      placeholder="Type transfer description"
                    />
                  </div>

                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mt-2"
                  >
                    {Caption.amount}
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <Field
                      name="amount"
                      className="block w-full h-8 flex-1 rounded-l-md rounded-r-md border-gray-200 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                      placeholder="Type amount"
                    />
                  </div>

                  {errors.amount && touched.amount ? (
                    <div>
                      <p className="text-red-500 text-sm mt-1">
                        {errors.amount}
                      </p>
                    </div>
                  ) : null}

                  <label
                    htmlFor="tax"
                    className="block text-sm font-medium text-gray-700 mt-2"
                  >
                    {Caption.tax}
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <Field
                      name="tax"
                      className="block w-full h-8 flex-1 rounded-l-md rounded-r-md border-gray-200 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                      placeholder="Type tax percentage"
                    />
                  </div>

                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium text-gray-700 mt-2"
                  >
                    {Caption.discount}
                  </label>
                  <div className="mt-1 flex rounded-md ">
                    <Field
                      name="discount"
                      className="block w-full h-8 flex-1 rounded-l-md rounded-r-md border-gray-200 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2"
                      placeholder="Type discount percentage"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-left sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {Caption.submit}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RecipientForm;
