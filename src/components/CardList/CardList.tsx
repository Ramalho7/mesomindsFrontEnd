import type { CardListProps } from "@/Interface/CardListProps";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CardDialog } from "../AlertDialog/CardDialog";
import { Link } from "@tanstack/react-router";

export default function CardList({
    id,
    isAdmin,
    title,
    cardInfoName,
    cardInfoNumber,
    description,
    type,
    creationDate,
    lastUpdateDate,
    creator,
    tagsName,
    editLink,
    editContent,
    titleCardDialog,
    descriptionCardDialog,
    confirmTextCardDialog,
    cancelTextCardDialog,
    buttonContentCardDialog,
    buttonContentSROnlyCardDialog,
    submitActionCardDialog
}: CardListProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <CardTitle className="flex flex-col justify-between gap-4">{title}
                    <p className="text-secondary font-bold">{cardInfoName}: <span className="font-normal">{cardInfoNumber}</span></p>
                    {isAdmin && (<p className="text-secondary font-normal"><span className="font-bold">ID:</span> {id}</p>)}
                </CardTitle>
                <CardAction className="flex flex-row gap-4">
                    <Link to={editLink} className="text-accent">
                        {editContent}
                    </Link>
                    <CardDialog
                        title={titleCardDialog}
                        description={descriptionCardDialog}
                        confirmText={confirmTextCardDialog}
                        cancelText={cancelTextCardDialog}
                        buttonContent={buttonContentCardDialog}
                        buttonContentSROnly={buttonContentSROnlyCardDialog}
                        submitAction={submitActionCardDialog}
                    />
                </CardAction>
            </CardHeader>
            <CardDescription>{description}</CardDescription>
            <div className="h-[2px] bg-accent"></div>
            <CardContent
                className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-x-10 sm:gap-y-7"
            >
                <p className="text-secondary font-bold">Tipo: <span className="font-normal">{type}</span></p>
                <p className="text-secondary font-bold">Criador: <span className="font-normal">{creator}</span></p>
                <p className="text-secondary font-bold">Data de criação: <span className="font-normal">{creationDate}</span></p>
                <p className="text-secondary font-bold">Última atualização: <span className="font-normal">{lastUpdateDate}</span></p>
                <div>
                    <p className="flex flex-row gap-2 text-secondary font-bold">Tags: <span className="flex flex-wrap gap-2">
                        {tagsName?.map((tag, index) => (
                            <span key={index} className="text-secondary font-normal">{tag}</span>
                        ))}
                    </span></p>
                </div>
            </CardContent>
        </Card>
    );
}