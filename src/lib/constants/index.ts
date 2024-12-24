import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms.types";
import {
    GROUP_LIST,
    GROUP_LIST_PROPS,
    GROUP_PLACEHOLDER,
    GroupPlaceholderProps,
} from "./schema";

type EUROPA_CONSTANTS_TYPES = {
    signInForm: AuthFormProps[];
    signUpForm: AuthFormProps[];
    groupPlaceholder: GroupPlaceholderProps[];
    groupList: GROUP_LIST_PROPS[];
};
export const EUROPA_CONSTANTS: EUROPA_CONSTANTS_TYPES = {
    signInForm: SIGN_IN_FORM,
    signUpForm: SIGN_UP_FORM,
    groupPlaceholder: GROUP_PLACEHOLDER,
    groupList: GROUP_LIST,
};
