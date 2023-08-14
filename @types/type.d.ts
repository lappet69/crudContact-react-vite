export type ContactType = {
  id?: number
  name: string
  email: string
  phone: string
  address: string
}
export type ContactContextType = {
  contacts: IContact[]
  saveContact: (contact: IContact) => void
  updateContact: (id: number) => void
}

export type ModalContextType = {
  open: boolean
  setOpen: () => void
}

export type ApiResponse = {
  current_page: number
  data?: ContactType[]
  first_page_url?: string
  from: number
  last_page?: number
  last_page_url?: string
  links: { url?: string; label?: string; active?: boolean }
  next_page_url: string
  path?: string
  per_page?: number
  prev_page_url?: string
  to: number
  total: number
}

export type InputType = {
  id?: number
  [name: string]: string
  email?: string
  phone?: string
  address?: string
}

export type InputContextType = {
  inputType: InputType
  setInputType: (value: InputType) => void
}
