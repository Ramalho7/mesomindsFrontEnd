import type { JSX } from "react";

export type CardListProps = {
    id?: string;
    isAdmin?: boolean;
    title?: string;
    detailsLink?: string;
    cardInfoName?: string;
    cardInfoNumber?: number;
    description?: string;
    type?: string;
    creationDate?: string; 
    lastUpdateDate?: string; 
    creator?: string;
    tagsName?: string[];
    editLink?: string;
    editContent?: JSX.Element | string;
    titleCardDialog?: string;
    descriptionCardDialog?: string;
    confirmTextCardDialog?: string;
    cancelTextCardDialog?: string;
    buttonContentCardDialog?: JSX.Element | string;
    buttonContentSROnlyCardDialog?: string;
    submitActionCardDialog?: () => void;
};