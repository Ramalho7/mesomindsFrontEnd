import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { CardDialogProps } from "@/Interface/CardDialogProps"

export function CardDialog({
  title,
  description,
  confirmText,
  cancelText,
  buttonContent,
  buttonContentSROnly,
  submitAction,
}: CardDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-accent cursor-pointer">{buttonContent}
          <span className="sr-only">{buttonContentSROnly}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle>{title}</AlertDialogTitle>
          )}
          {description && (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          )}
          {confirmText && (
            <AlertDialogAction onClick={submitAction}>{confirmText}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
