import * as Yup from "yup";

export const RecipientSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  amount: Yup.number()
    .min(10000, "Amount must greater than 10.000")
    .required("Required"),
});
