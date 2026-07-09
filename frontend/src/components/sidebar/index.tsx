import React from 'react';
import { ActionButton, Aside, ContentWrapper, HeaderTitle } from './style'; 

interface SidebarProps {
    title: string;
    actionButtonText: string;
    onAction: () => void;
    isActionDisabled?: boolean;
    isOpen: boolean; 
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
    title,
    actionButtonText,
    onAction,
    isActionDisabled = false,
    isOpen, 
    children,
}) => {
    return (
        
        <Aside $isOpen={isOpen}> 
            <ContentWrapper>
                <HeaderTitle>{title}</HeaderTitle>
                {children}
            </ContentWrapper>

            <ActionButton type="button" onClick={onAction} disabled={isActionDisabled}>
                {actionButtonText}
            </ActionButton>
        </Aside>
    );
};