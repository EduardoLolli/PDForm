import { CardDescription, CardIcon, CardLink, CardTitle } from "./styles/Home"

interface ICardFunctionLink {
    iconString: string
    title: string;
    description: string;
    route: string;
}

export const CardFunctionLink = ({ iconString, title, description, route }: ICardFunctionLink) => {
    return (
        <CardLink to={route}>
            <CardIcon>{iconString}</CardIcon>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardLink>)
}