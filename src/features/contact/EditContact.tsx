import { PencilIcon } from "@heroicons/react/24/outline"
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react"
import React, { useEffect } from "react"
import { httpRequest, validateNumber } from "../../utils"

type InputType = {
  data?: {
    id?: number
    name?: string
    email?: string
    phone?: string
    address?: string
  }
}

export function EditContact({ data }: InputType) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

  const [inputState, setInputState] = React.useState<any>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [err, setErr] = React.useState("")

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputState({ ...inputState, [event.target.name]: event.target.value })
  }

  const handleSumbit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (
      !inputState.name ||
      !inputState.email ||
      !inputState.address ||
      !inputState.phone
    ) {
      setErr("This field is required")
      setTimeout(() => {
        setErr("")
      }, 2000)
    }
    const resp = await httpRequest(
      "PUT",
      `/update-contact/${inputState?.id}`,
      inputState,
    )
    setOpen(false)
  }

  useEffect(() => {
    setInputState(data)
  }, [])

  return (
    <>
      <IconButton
        variant="text"
        className="flex flex-col items-center justify-center"
      >
        <PencilIcon className="h-4 w-4 " onClick={handleOpen} />
      </IconButton>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-indigo-500">Edit Contact</DialogHeader>
        <DialogBody divider>
          <Card color="transparent" shadow={false}>
            <form className="mb-2 w-full max-w-screen-lg ">
              <div className="mb-4 flex flex-col gap-6 ">
                <Input
                  color="indigo"
                  size="lg"
                  label="Name"
                  name="name"
                  value={inputState.name}
                  onChange={handleChange}
                />
                {err && !inputState.name && (
                  <span className="-mt-4 ml-4 text-xs text-red-500">{err}</span>
                )}
                <Input
                  color="indigo"
                  size="lg"
                  label="Phone"
                  name="phone"
                  value={inputState.phone}
                  onKeyDown={validateNumber}
                  onChange={handleChange}
                />
                {err && !inputState.phone && (
                  <span className="-mt-4 ml-4 text-xs text-red-500">{err}</span>
                )}
                <Input
                  type="email"
                  color="indigo"
                  size="lg"
                  label="Email"
                  name="email"
                  value={inputState.email}
                  onChange={handleChange}
                />
                {err && !inputState.email && (
                  <span className="-mt-4 ml-4 text-xs text-red-500">{err}</span>
                )}
                <Textarea
                  color="indigo"
                  label="Address"
                  name="address"
                  value={inputState.address}
                  onChange={handleChange}
                />
                {err && !inputState.address && (
                  <span className="-mt-4 ml-4 text-xs text-red-500">{err}</span>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1 outline outline-1 hover:bg-red-500 hover:text-white"
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  variant="gradient"
                  type="submit"
                  color="indigo"
                  onClick={handleSumbit}
                >
                  <span>Submit</span>
                </Button>
              </DialogFooter>
            </form>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  )
}
