import { z } from "zod";

/** Auth & Users */
export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});
export type TAuth = z.infer<typeof authSchema>;
export type TUserLoginForm = Pick<TAuth, "email" | "password">;
export type TUserRegistrationForm = Pick<
  TAuth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type TConfirmToken = Pick<TAuth, "token">;
export type TRequestConfirmationCodeForm = Pick<TAuth, "email">;
export type TForgotPasswordForm = Pick<TAuth, "email">;
export type TNewPasswordForm = Pick<
  TAuth,
  "password" | "password_confirmation"
>;
export type TUpdateCurrentUserPasswordForm = Pick<
  TAuth,
  "current_password" | "password" | "password_confirmation"
>;
export type TCheckPasswordForm = Pick<TAuth, "password">;

/** Users */
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });
export type TUser = z.infer<typeof userSchema>;
export type TUserProfileForm = Pick<TUser, "name" | "email">;

/** Notes */
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type TNote = z.infer<typeof noteSchema>;
export type TNoteFormData = Pick<TNote, "content">;

/*Tasks*/
export const taskStatusShema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusShema,
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusShema,
    })
  ),
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema,
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
});
export type TTask = z.infer<typeof taskSchema>;
export type TTaskProject = z.infer<typeof taskProjectSchema>;
export type TTaskFormData = Pick<TTask, "name" | "description">;
export type TTaskStatus = z.infer<typeof taskStatusShema>;

/*Projects*/
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({ _id: true }))), // team members
});
export const dashboardProjectsSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
});

export type TProject = z.infer<typeof projectSchema>;
export type TProjectFormData = Pick<
  TProject,
  "projectName" | "clientName" | "description"
>;

/** Team */
export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TTeamMember = z.infer<typeof teamMemberSchema>;
export type TTeamMemberForm = Pick<TTeamMember, "email">;
