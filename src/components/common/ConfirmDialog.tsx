import { Modal } from './Modal'
import { Button } from './Button'
import './common.css'

interface ConfirmDialogProps {
  show: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmLabel?: string
  danger?: boolean
}

export function ConfirmDialog({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = '确认',
  danger = false,
}: ConfirmDialogProps) {
  return (
    <Modal show={show} title={title} onClose={onCancel}>
      <p className="confirm-dialog__message">{message}</p>
      <div className="confirm-dialog__actions">
        <Button variant="secondary" onClick={onCancel}>
          取消
        </Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
