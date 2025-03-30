import { deleteLineItem } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  children,
  className,
  preview,
}: {
  id: string
  preview?: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div className={clx("flex items-center justify-between", className)}>
      <button
        className={clx(
          "flex text-[#00000099] gap-x-1 hover:opacity-[0.7] cursor-pointer",
          {
            "text-white": preview !== "true",
          }
        )}
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? (
          <Spinner className="animate-spin" />
        ) : (
          <Trash className="mt-1" />
        )}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
