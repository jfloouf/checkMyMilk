import React from 'react'
import styled from 'styled-components';

const Root = styled.ul`
    display: grid;
    width: 100%;
    height: 100%;
    padding: 2.5rem;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fill, minmax(10rem, auto));
    
    gap: 0.5rem;
`

const SLabel = styled.label`

`

const SInput = styled.input`

`

const Item = styled.li`
    border: 1px solid black;
    width: 100%;
    height: 100%;
`

interface Props {

}

export function Joseph(props: Props) {

    const items = () => {
        return Array(15).fill(0).map((_, i) => <Item>{i}</Item>)
    }

    return (
        <Root>
            {items()}
        </Root>
)

}