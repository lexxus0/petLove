import * as Yup from "yup";

const emailRegExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const imgUrlRegExp = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/;
const birthdayRegExp = /^\d{4}-\d{2}-\d{2}$/;
const phoneRegExp = /^\+38\d{10}$/;

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please, provide a name"),
  email: Yup.string()
    .required("Please, provide an email")
    .matches(emailRegExp, "Please, provide a valid email"),
  password: Yup.string()
    .required("Please, provide a password")
    .min(7, "Password must be 7 characters or more"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please, provide an email")
    .matches(emailRegExp, "Please, provide a valid email"),
  password: Yup.string()
    .required("Please, provide a password")
    .min(7, "Password must be 7 characters or more"),
});

export const addPetValidationSchema = Yup.object().shape({
  title: Yup.string().required("Please, provide a title"),
  name: Yup.string().required("Please, provide a name"),
  imgURL: Yup.string()
    .required("Please, provide a image URL")
    .matches(imgUrlRegExp, "Please, provide a valid URL"),
  species: Yup.string().required("Please, provide type of pet"),
  birthday: Yup.string()
    .required("Please, provide a birthday")
    .matches(birthdayRegExp, "Please. provide a valid birth date"),
  sex: Yup.string().required("Please, provide a sex"),
});

export const EditUserValidationSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().matches(emailRegExp, "Please, provide a valid email"),
  avatar: Yup.string().matches(imgUrlRegExp, "Please, provide a valid URL"),
  phone: Yup.string()
    .required("Please, provide a phone number")
    .matches(phoneRegExp, "Please, provide a valid phone number"),
});
