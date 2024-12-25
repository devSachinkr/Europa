import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from "./forms.types";
import { ICON_LIST, ICON_LIST_PROPS } from "./icon.schema";
import {
  GROUP_LIST,
  GROUP_LIST_PROPS,
  GROUP_PLACEHOLDER,
  GroupPlaceholderProps,
  MENU_PROPS,
  SIDEBAR_SETTINGS_MENU,
} from "./schema";

type EUROPA_CONSTANTS_TYPES = {
  signInForm: AuthFormProps[];
  signUpForm: AuthFormProps[];
  groupPlaceholder: GroupPlaceholderProps[];
  groupList: GROUP_LIST_PROPS[];
  sidebarSettingsMenu: MENU_PROPS[];
  iconList: ICON_LIST_PROPS[];
};
export const EUROPA_CONSTANTS: EUROPA_CONSTANTS_TYPES = {
  signInForm: SIGN_IN_FORM,
  signUpForm: SIGN_UP_FORM,
  groupPlaceholder: GROUP_PLACEHOLDER,
  groupList: GROUP_LIST,
  sidebarSettingsMenu: SIDEBAR_SETTINGS_MENU,
  iconList: ICON_LIST,
};
