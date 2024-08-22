export interface IModel {
  value: string
  label: string
  content?: string
  icon?: any
}

export interface IPrompt {
  value: string
  label: string
  content: string
}

export interface ITranscript {
  text: string
  startTime: number
  endTime: number
}

export interface IUser {
  displayName: string
  email: string
  googleId: string
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}
