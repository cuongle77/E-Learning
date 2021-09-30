const content = {
  form: {
    login: [
      {
        label: "Username",
        name: "username",
        type: "text",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
      },
    ],

    register: [
      {
        label: "Username",
        name: "username",
        type: "text",
      },
      {
        label: "Password",
        name: "password",
        type: "password",
      },
      {
        label: "Confirm Password",
        name: "confirm_password",
        type: "password",
      },
      {
        label: "Name",
        name: "name",
        type: "text",
      },
      {
        label: "Phone",
        name: "phone",
        type: "text",
      },
      {
        select: [
          { value: "GP01", group: "Group1" },
          { value: "GP02", group: "Group2" },
          { value: "GP03", group: "Group3" },
          { value: "GP04", group: "Group4" },
          { value: "GP05", group: "Group5" },
          { value: "GP06", group: "Group6" },
          { value: "GP07", group: "Group7" },
          { value: "GP08", group: "Group8" },
        ],
      },
      {
        label: "Email",
        name: "email",
        type: "email",
      },
    ],
  },
};

export default content;
