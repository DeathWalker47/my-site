import { validateForms } from "../functions/validate-forms.js";

const rules = [
  {
    ruleSelector: ".input-services",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Выберите одну из услуг!",
      },
    ],
  },
  {
    ruleSelector: ".input-name",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: ".input-email",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните Email!",
      },
      {
        rule: "email",
        value: true,
        errorMessage: "Введите корректный email!",
      },
    ],
  },
  {
    ruleSelector: ".input-textarea",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Введите сообщение!",
      },
    ],
  },
];

const afterForm = () => {
  console.log("Произошла отправка, тут можно писать любые действия");
};

validateForms(".form", rules, afterForm);
