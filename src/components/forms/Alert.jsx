import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "../ui/alert-dialog";

import { useState } from "react";

export const Alert = (props) => {
    const { onClick, open, onOpenChange, dialog, dialogCancel, dialogTitle } = props;
    const [loginError, setLoginError] = useState(false);

    // Pastikan open dan onOpenChange dari props digunakan untuk mengontrol status dialog
    const handleClose = () => {
        setLoginError(false); // Menutup alert dialog
        if (onOpenChange) {
            onOpenChange(false); // Mengubah status open jika onOpenChange diberikan sebagai props
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {dialog}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClick}>{dialogCancel}</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}