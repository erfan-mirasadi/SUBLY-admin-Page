// TableDeleteDialog.jsx
// This component renders the delete confirmation dialog for the table.
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function TableDeleteDialog({
  confirmOpen,
  setConfirmOpen,
  handleConfirmDelete,
  deleting,
}) {
  return (
    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
      <DialogContent className="w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>آیا مطمئن هستید؟</DialogTitle>
          <p className="text-sm text-muted-foreground">
            با حذف این مورد، امکان بازگرداندن آن وجود ندارد.
          </p>
        </DialogHeader>
        <div>
          آیا از حذف این مورد اطمینان دارید؟ این عملیات غیرقابل بازگشت است.
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setConfirmOpen(false)}
            disabled={deleting}
            className="w-full sm:w-auto"
          >
            انصراف
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={deleting}
            className="w-full sm:w-auto"
          >
            {deleting ? (
              <span className="flex items-center justify-center">
                <Spinner size="small" />
              </span>
            ) : (
              "تایید حذف"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
