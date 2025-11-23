'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Wallet } from 'lucide-react'
import { EditableNumber } from '@/components/ui/editable-number'
import { useDashboard } from '@/components/dashboard/dashboard-context'

interface NetWorthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  totalBalance: number
}

export function NetWorthDialog({ open, onOpenChange, totalBalance }: NetWorthDialogProps) {
  const { accounts, updateAccount } = useDashboard()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wallet className="h-5 w-5 text-primary" />
            Net Worth Snapshot
          </DialogTitle>
          <DialogDescription>
            Manage your accounts and balances. Total Net Worth: $
            <span className="font-bold text-foreground">
              <EditableNumber
                value={totalBalance}
                onSave={(value) => {
                  const currentTotal = accounts.reduce((sum, acc) => sum + acc.balance, 0)
                  const difference = value - currentTotal
                  if (accounts.length > 0) {
                    const perAccount = difference / accounts.length
                    accounts.forEach((acc) => {
                      updateAccount(acc.id, { balance: acc.balance + perAccount })
                    })
                  }
                }}
                formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
              />
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="space-y-3">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className="flex items-center justify-between rounded-lg border p-4 bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{acc.name}</p>
                  <p className="text-sm text-muted-foreground">{acc.institution}</p>
                </div>
                <div className="font-mono font-bold text-lg">
                  $
                  <EditableNumber
                    value={acc.balance}
                    onSave={(value) => updateAccount(acc.id, { balance: value })}
                    formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                    allowNegative={acc.type === 'credit'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
