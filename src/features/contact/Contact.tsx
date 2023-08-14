import { TrashIcon } from "@heroicons/react/24/outline"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { ApiResponse, ContactType } from "../../../@types/type"
import { httpRequest } from "../../utils"
import { AddContact } from "./AddContact"
import { EditContact } from "./EditContact"

const TABLE_HEAD = ["Name", "Phone", "Address", ""]

export function Contact() {
  const [contacts, setContacts] = useState<ApiResponse | []>([])
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    fetchContact(currentPage)
  }, [currentPage])
  const fetchContact = async (page: number) => {
    const resp = await httpRequest("GET", `/get-all-contact?page=${page}`).then(
      (resp) => setContacts(resp?.result),
    )
    return resp
  }

  const handlePage = (label: string) => {
    label === "next" && setCurrentPage(currentPage + 1)
    label === "prev" && currentPage > 1 && setCurrentPage(currentPage - 1)

    fetchContact(currentPage)
  }

  const totalPage = () => {
    return (
      ("total" in contacts &&
        "per_page" in contacts &&
        Math.ceil(contacts.total / contacts!.per_page!)) ||
      1
    )
  }

  const handleDelete = async (id: number) => {
    const resp = await httpRequest("DELETE", `/delete-contact/${id}`)
    if (resp.code === 200) {
      window.location.reload()
    }
  }

  return (
    <div className="w-full flex justify-center">
      <Card className="h-full md:max-w-[75%] w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-2 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Contact list
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <AddContact />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts &&
                "data" in contacts &&
                contacts?.data?.map((item: ContactType, index: number) => {
                  const isLast = index === contacts!.data!.length - 1
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50"

                  return (
                    <tr key={item.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {item.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.phone}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            size="sm"
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item.address}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex items-center justify-center">
                          <EditContact data={contacts!.data![index]} />
                          <IconButton
                            variant="text"
                            className="flex flex-col items-center justify-center"
                          >
                            <TrashIcon
                              strokeWidth={2}
                              className="h-4 w-4 text-red-300"
                              onClick={() => handleDelete(item.id!)}
                            />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {"current_page" in contacts && contacts?.current_page} of {""}
            {contacts && totalPage()}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === 1 ? true : false}
              onClick={() => handlePage("prev")}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePage("next")}
              disabled={currentPage === totalPage() ? true : false}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
