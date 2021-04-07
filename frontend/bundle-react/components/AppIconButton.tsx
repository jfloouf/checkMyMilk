import React from 'react'
import styled from 'styled-components';
import { AppIcon } from './AppIcon';

const Root = styled.button`
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
`
interface Props {
    icon: string | string[];
    onClick?();
    className?: string;
}

export function AppIconButton(props: Props) {

    return (
        <Root onClick={props.onClick} className={props.className}>
            <AppIcon {...props}></AppIcon>
        </Root>
)

}