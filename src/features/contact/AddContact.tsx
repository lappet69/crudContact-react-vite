import { UserPlusIcon } from "@heroicons/react/24/outline"
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
} from "@material-tailwind/react"
import React, { useEffect } from "react"
import { InputType } from "../../../@types/type"
import { httpRequest, validateNumber } from "../../utils"

export function AddContact() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(!open)
    setInputState([])
  }
  const [inputState, setInputState] = React.useState<[] | InputType>([])
  const [err, setErr] = React.useState<any>({})

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputState({ ...inputState, [event.target.name]: event.target.value })
  }

  const handleSumbit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const resp = await httpRequest("POST", "/add-contact", inputState)
      console.log(resp.statusCode)
      if (resp?.code === 201) {
        setOpen(false)
        window.location.reload()
      } else {
        setErr(resp)
        setTimeout(() => {
          setErr({})
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(err?.email?.toString())

  useEffect(() => {}, [])

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        color="indigo"
        className="flex items-center gap-3"
        size="sm"
      >
        <UserPlusIcon
          strokeWidth={2}
          className="h-4 w-4"
          onClick={handleOpen}
        />
        Add Contact
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-indigo-500">Add New Contact</DialogHeader>
        <DialogBody divider>
          <Card color="transparent" shadow={false}>
            <form className="mb-2 w-full max-w-screen-lg ">
              <div className="mb-4 flex flex-col gap-6 ">
                <Input
                  color="indigo"
                  size="lg"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                />
                {err.name && "name" in inputState && !inputState?.name && (
                  <span className="-mt-4 ml-4 text-xs text-red-500">
                    {err?.name.toString() || ""}
                  </span>
                )}
                <Input
                  color="indigo"
                  size="lg"
                  label="Phone"
                  name="phone"
                  onKeyDown={validateNumber}
                  onChange={handleChange}
                />
                {err.phone && "phone" in inputState && !inputState?.phone && (
                  <span className="-mt-4 ml-4 text-xs text-red-500">
                    {err?.phone?.toString() || ""}
                  </span>
                )}
                <Input
                  type="email"
                  color="indigo"
                  size="lg"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                />
                {err.email && "email" in inputState && !inputState.email && (
                  <span className="-mt-4 ml-4 text-xs text-red-500">
                    {err?.email?.toString() || ""}
                  </span>
                )}
                <Textarea
                  color="indigo"
                  label="Address"
                  name="address"
                  onChange={handleChange}
                />
                {err.address &&
                  "address" in inputState &&
                  !inputState.address && (
                    <span className="-mt-4 ml-4 text-xs text-red-500">
                      {err?.address.toString() || ""}
                    </span>
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
