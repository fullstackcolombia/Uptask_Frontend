import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { TUpdateCurrentUserPasswordForm, TUserProfileForm } from "../types";

export async function updateProfile(formData: TUserProfileForm) {
  try {
    const { data } = await api.put<string>(`/auth/profile`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function changePassword(formData: TUpdateCurrentUserPasswordForm) {
  try {
    const { data } = await api.post<string>(`/auth/update-password`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
