import { Toast } from '@base-ui/react/toast'
import { CloseCircle, TickCircle } from 'iconsax-reactjs'
import { useEffect, useRef } from 'react'

interface ActionSaveToastProps {
  message: string
  onDismiss: () => void
}

const SAVE_TOAST_TIMEOUT_MS = 8000

export const ActionSaveToast = ({
  message,
  onDismiss,
}: ActionSaveToastProps): React.JSX.Element => (
  <Toast.Provider limit={1} timeout={SAVE_TOAST_TIMEOUT_MS}>
    <ActionSaveToastPublisher message={message} onDismiss={onDismiss} />
    <Toast.Portal>
      <Toast.Viewport className="action-save-toast__viewport">
        <ActionSaveToastList />
      </Toast.Viewport>
    </Toast.Portal>
  </Toast.Provider>
)

const ActionSaveToastPublisher = ({
  message,
  onDismiss,
}: ActionSaveToastProps): null => {
  const { add } = Toast.useToastManager()
  const onDismissRef = useRef(onDismiss)

  useEffect(() => {
    onDismissRef.current = onDismiss
  }, [onDismiss])

  useEffect(() => {
    add({
      id: 'inventory-unit-save',
      title: 'Action saved',
      description: message,
      type: 'success',
      timeout: SAVE_TOAST_TIMEOUT_MS,
      priority: 'low',
      onRemove: () => onDismissRef.current(),
    })
  }, [add, message])

  return null
}

const ActionSaveToastList = (): React.JSX.Element => {
  const { toasts } = Toast.useToastManager()

  return (
    <>
      {toasts.map((toast) => (
        <Toast.Root key={toast.id} toast={toast} className="action-save-toast" swipeDirection="right">
          <Toast.Content className="action-save-toast__content">
            <span className="action-save-toast__marker" aria-hidden="true">
              <TickCircle size={17} />
            </span>
            <span className="action-save-toast__copy">
              <Toast.Title className="action-save-toast__title" />
              <Toast.Description className="action-save-toast__description" />
            </span>
            <Toast.Close
              className="action-save-toast__dismiss"
              aria-label="Dismiss action saved message"
            >
              <CloseCircle size={18} aria-hidden="true" />
            </Toast.Close>
          </Toast.Content>
        </Toast.Root>
      ))}
    </>
  )
}
