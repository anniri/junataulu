import React, {createContext, useState, useEffect} from 'react';

interface Props {
    children: React.ReactNode
}

export const FavoritesContext : React.Context<any> = createContext(undefined);

export const FavoritesProvider : React.FC<Props> = (props : Props) : React.ReactElement => {
    return (
        <FavoritesContext.Provider value={{}}>
            {props.children}
        </FavoritesContext.Provider>
    )
}