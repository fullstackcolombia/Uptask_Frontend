import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  TCheckPasswordForm,
  TConfirmToken,
  TForgotPasswordForm,
  TNewPasswordForm,
  TRequestConfirmationCodeForm,
  TUserLoginForm,
  TUserRegistrationForm,
  userSchema,
} from "../types";

export async function createAccount(formData: TUserRegistrationForm) {
  try {
    const { data } = await api.post<string>(`/auth/create-account`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmAccount(formData: TConfirmToken) {
  try {
    const { data } = await api.post<string>(`/auth/confirm-account`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestConfirmationCode(
  formData: TRequestConfirmationCodeForm
) {
  try {
    const { data } = await api.post<string>(`/auth/request-code`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateUser(formData: TUserLoginForm) {
  try {
    const { data } = await api.post<string>(`/auth/login`, formData);
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function forgotPassword(formData: TForgotPasswordForm) {
  try {
    const { data } = await api.post<string>(`/auth/forgot-password`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function validateToken(formData: TConfirmToken) {
  try {
    const { data } = await api.post<string>(`/auth/validate-token`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: TNewPasswordForm;
  token: TConfirmToken["token"];
}) {
  try {
    const { data } = await api.post<string>(
      `/auth/update-password/${token}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUser() {
  try {
    const { data } = await api.get(`/auth/user`);
    const response = userSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function checkPassword(formData: TCheckPasswordForm) {
  try {
    const { data } = await api.post<string>(`/auth/check-password`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
