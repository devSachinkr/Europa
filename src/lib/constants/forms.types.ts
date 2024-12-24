export interface AuthFormProps {
    name: string;
    inputType: "input" | "select";
    id: string;
    type: "email" | "text" | "password";
    label?: string;
    placeholder: string;
    options?: { value: string; label: string; id: string }[];
}

export const SIGN_UP_FORM: AuthFormProps[] = [
    {
        id: "1",
        inputType: "input",
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter your first name",
    },
    {
        id: "2",
        inputType: "input",
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter your last name",
    },
    {
        id: "3",
        inputType: "input",
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
    },
    {
        id: "4",
        inputType: "input",
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
    },
];

export const SIGN_IN_FORM: AuthFormProps[] = [
    {
        id: "1",
        inputType: "input",
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
    },
    {
        id: "2",
        inputType: "input",
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
    },
];
