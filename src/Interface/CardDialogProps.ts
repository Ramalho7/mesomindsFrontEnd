import type { JSX } from "react";

export type CardDialogProps = {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    buttonContent?: JSX.Element | string;
    buttonContentSROnly?: string;
    submitAction?: () => void;
};