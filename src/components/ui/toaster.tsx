import { useToast } from "@/hooks/use-toast"
import Toast, { ToastContainer } from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastContainer>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        // our local Toast component expects message, type, duration, onClose
        // map the incoming props accordingly
        const message = description || title || ''
        const type = (props.variant as any) || 'info'
        const duration = props.duration || 5000

        return (
          <Toast
            key={id}
            message={message}
            type={type}
            duration={duration}
            onClose={() => props.onClose && props.onClose()}
          />
        )
      })}
    </ToastContainer>
  )
}
